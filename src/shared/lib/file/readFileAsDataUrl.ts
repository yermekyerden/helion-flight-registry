export function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      if (typeof reader.result !== 'string') {
        reject(new Error('FileReader did not return a data URL.'));
        return;
      }

      resolve(reader.result);
    });

    reader.addEventListener('error', () => {
      reject(reader.error ?? new Error('Failed to read file.'));
    });

    reader.readAsDataURL(file);
  });
}
