type CreateTestImageFileParams = {
  name?: string;
  type?: string;
  content?: string;
};

export function createTestImageFile({
  content = 'test image content',
  name = 'pilot.png',
  type = 'image/png',
}: CreateTestImageFileParams = {}) {
  return new File([content], name, { type });
}
