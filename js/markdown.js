function markAlert(html) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(html, "text/html");

  dom.querySelectorAll("blockquote").forEach((element) => {
    const textContent = element.textContent.toLowerCase().trim();
    if (textContent.startsWith("[!important]")) {
      const content = element.textContent
        .trimStart()
        .replace(/^\[!important\]\s*/i, "");
      element.innerHTML = `
        <div class="alert-header is-important">
            <b><i class="fa-solid fa-exclamation"></i> Important</b>
        </div>
        <div class="alert-content">${content}</div>
      `;
      element.className = "alert-important";
    } else if (textContent.startsWith("[!tip]")) {
      const content = element.textContent
        .trimStart()
        .replace(/^\[!tip\]\s*/i, "");
      element.innerHTML = `
        <div class="alert-header is-tip">
            <b><i class="fa-solid fa-lightbulb"></i> Tip</b>
        </div>
        <div class="alert-content">${content}</div>
      `;
      element.className = "alert-tip";
    } else if (textContent.startsWith("[!note]")) {
      const content = element.textContent
        .trimStart()
        .replace(/^\[!note\]\s*/i, "");
      element.innerHTML = `
        <div class="alert-header is-note">
            <b><i class="fa-solid fa-circle-info"></i> Note</b>
        </div>
        <div class="alert-content">${content}</div>
      `;
      element.className = "alert-note";
    } else if (textContent.startsWith("[!warning]")) {
      const content = element.textContent
        .trimStart()
        .replace(/^\[!warning\]\s*/i, "");
      element.innerHTML = `
        <div class="alert-header is-warning">
            <b><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Warning</b>
        </div>
        <div class="alert-content">${content}</div>
      `;
      element.className = "alert-warning";
    } else if (textContent.startsWith("[!caution]")) {
      const content = element.textContent
        .trimStart()
        .replace(/^\[!caution\]\s*/i, "");
      element.innerHTML = `
        <div class="alert-header is-caution">
            <b><i class="fa-solid fa-circle-exclamation"></i> caution</b>
        </div>
        <div class="alert-content">${content}</div>
      `;
      element.className = "alert-caution";
    }
  });

  return dom.body.innerHTML;
}

document.addEventListener("DOMContentLoaded", () => {
  const element = document.getElementById("content");

  element.innerHTML = markAlert(element.innerHTML);
});
