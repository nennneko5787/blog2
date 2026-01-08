function timeAgo(isoString) {
  const now = new Date();
  const past = new Date(isoString);

  const diffMs = now - past;
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) {
    return `${diffSec}秒前`;
  }

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) {
    return `${diffMin}分前`;
  }

  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) {
    return `${diffHour}時間前`;
  }

  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 30) {
    return `${diffDay}日前`;
  }

  const diffMonth = Math.floor(diffDay / 30);
  if (diffMonth < 12) {
    return `${diffMonth}か月前`;
  }

  const diffYear = Math.floor(diffMonth / 12);
  return `${diffYear}年前`;
}

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

    const name = document.createElement("a");
    name.textContent = comment.user.login;
    name.href = comment.user.html_url;

    const date = document.createElement("span");
    date.title = new Date(comment.created_at).toLocaleString();
    date.textContent = timeAgo(comment.created_at);

    authorElement.append(figure);
    authorElement.append(name);
    authorElement.append(date);

    const content = document.createElement("span");
    content.textContent = comment.body;

    commentElement.append(authorElement);
    commentElement.append(content);

    comments.append(commentElement);
  });
});
