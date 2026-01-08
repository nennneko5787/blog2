from datetime import date
from pathlib import Path

import frontmatter


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
        post = frontmatter.load(f)
        fIdToTitle[file.name] = post["title"]

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

with open("_layouts/default.template.html", "r", encoding="utf-8") as f:
    template = f.read()

template = template.replace(
    "{articles}",
    "\n                  ".join(
        [
            f'<li><a href="/articles/{f.name.removesuffix(".md")}">{fIdToTitle[f.name]}</a>'
            for f in files
        ][0:5]
    ),
)

with open("_layouts/default.html", "w", encoding="utf-8") as f:
    f.write(template)
