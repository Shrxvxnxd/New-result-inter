
// Function to create download links
function createDownload(button, filePath, fileName) {
  if (button) {
    button.addEventListener('click', () => {
      const downloadLink = document.createElement('a');
      downloadLink.href = filePath;
      downloadLink.download = fileName;  // Trigger download
      document.body.appendChild(downloadLink);
      downloadLink.click(); // Simulate a click to trigger download
      document.body.removeChild(downloadLink); // Remove the link after the download
    });
  }
}



// Function to copy text to clipboard
function copyToClipboard() {
  var textElement = document.getElementById("text-to-copy");
  var copyButton = document.getElementById("copy-button");

  if (textElement && copyButton) {
    var text = textElement.innerText;

    // Create a temporary textarea element
    var tempTextArea = document.createElement("textarea");
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);

    // Select and copy the text
    tempTextArea.select();
    document.execCommand("copy");

    // Remove the temporary textarea
    document.body.removeChild(tempTextArea);

    // Update the button text
    copyButton.innerText = "Copied!";
    setTimeout(() => {
      copyButton.innerText = "Copy";
    }, 2000);
  }
}
