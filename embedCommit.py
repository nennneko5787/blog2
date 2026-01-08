import subprocess
import sys
from pathlib import Path


def getCommits(repo_dir: Path, filepath: Path):
    cmd = [
        "git",
        "-C",
        str(repo_dir),
        "log",
        "--follow",
        "--format=%H|%an|%at|%s",
        "--",
        str(filepath),
    ]

    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        check=False,
    )

    if result.returncode != 0:
        return []

    commits = []
    for line in result.stdout.splitlines():
        sha, author, ts, msg = line.split("|", 3)
        commits.append(
            {
                "sha": sha,
                "author": author,
                "timestamp": int(ts),
                "message": msg,
            }
        )
    commits.sort(key=lambda v: v["timestamp"])
    return commits


print(getCommits("./", f"articles/{sys.argv[1]}.md"))
