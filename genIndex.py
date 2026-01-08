from datetime import date
from pathlib import Path


def sortKey(path: Path):
    y, m, d, n = path.stem.split("-")
    return (date(int(y), int(m), int(d)), int(n))


articlesDirectory = Path("articles")

files = sorted(
    (f for f in articlesDirectory.iterdir() if f.is_file()), key=sortKey, reverse=True
)

fIdToTitle = {}

for file in files:
    with open(f"articles/{file.name}", "r", encoding="utf-8") as f:
        fIdToTitle[file.name] = f.read().splitlines()[0].removeprefix("# ")

with open("index.template.md", "r", encoding="utf-8") as f:
    template = f.read()

template = template.replace(
    "{articles}",
    "  \n".join(
        [
            f"- [{fIdToTitle[f.name]}](/articles/{f.name.removesuffix('.md')})"
            for f in files
        ]
    ),
)

with open("index.md", "w", encoding="utf-8") as f:
    f.write(template)
