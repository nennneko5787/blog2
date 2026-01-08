document.addEventListener("DOMContentLoaded", async () => {
  const comments = document.getElementById("comments");

  if (commitId === undefined || commitId == "") {
    comments.textContent = "この記事ではコメントが無効化されています";
  }

  const response = await fetch(
    `https://api.github.com/repos/nennneko5787/blog2/commits/${commitId}/comments`,
    {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
  const jsonData = await response.json();

  jsonData.forEach((comment) => {
    const commentElement = document.createElement("div");
    commentElement.className = "comment";

    const authorElement = document.createElement("div");
    authorElement.className = "commentAuthor";

    const figure = document.createElement("figure");
    figure.className = "image is-24x24";

    const image = document.createElement("img");
    image.className = "is-rounded";
    image.src = comment.user.avatar_url;
    figure.append(image);

    authorElement.append(figure);

    const content = document.createElement("span");
    content.textContent = comment.body;

    commentElement.append(authorElement);
    commentElement.append(content);

    comments.append(commentElement);
  });
});
