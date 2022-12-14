class Settings {
  async setApplicationBackground(imageURL) {
    let imageBlob = await fetch(imageURL)
      .then((response) => response.blob())
      .then((imageBlob) => URL.createObjectURL(imageBlob));
    console.log(imageBlob);
  }
}

export default Settings;
