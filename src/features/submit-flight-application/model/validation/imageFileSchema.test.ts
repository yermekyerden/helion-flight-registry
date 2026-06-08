import { describe, expect, it } from 'vitest';

import { flightApplicationFormLimits } from '@/shared/config/flightApplicationFormLimits';
import { createTestImageFile } from '@/shared/lib/test/createTestImageFile';

import { flightApplicationValidationMessages as messages } from './flightApplicationValidationMessages';
import { imageFileSchema } from './imageFileSchema';

const bytesPerMegabyte = 1024 * 1024;

describe('imageFileSchema', () => {
  it.each([
    { fileName: 'pilot.png', mimeType: 'image/png' },
    { fileName: 'pilot.jpg', mimeType: 'image/jpeg' },
  ])('accepts a valid $mimeType image file', ({ fileName, mimeType }) => {
    const file = createTestImageFile({
      name: fileName,
      type: mimeType,
    });

    const result = imageFileSchema.safeParse(file);

    expect(result.success).toBe(true);
  });

  it('rejects a missing file', () => {
    const result = imageFileSchema.safeParse(undefined);

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }

    expect(result.error.issues[0]?.message).toBe(
      messages.pilotIdentity.missingPilotPhoto,
    );
  });

  it('rejects an empty file input value', () => {
    const file = createTestImageFile({
      content: '',
      name: '',
      type: 'application/octet-stream',
    });

    const result = imageFileSchema.safeParse(file);

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }

    expect(result.error.issues[0]?.message).toBe(
      messages.pilotIdentity.invalidPilotPhotoType,
    );
  });

  it('rejects a file with an unsupported MIME type', () => {
    const file = createTestImageFile({
      name: 'pilot.gif',
      type: 'image/gif',
    });

    const result = imageFileSchema.safeParse(file);

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }

    expect(result.error.issues[0]?.message).toBe(
      messages.pilotIdentity.invalidPilotPhotoType,
    );
  });

  it('rejects an image file larger than the configured size limit', () => {
    const oversizedImageSize =
      flightApplicationFormLimits.image.maxSizeInMegabytes * bytesPerMegabyte +
      1;

    const file = new File([new Uint8Array(oversizedImageSize)], 'pilot.png', {
      type: 'image/png',
    });

    const result = imageFileSchema.safeParse(file);

    expect(result.success).toBe(false);

    if (result.success) {
      return;
    }

    expect(result.error.issues[0]?.message).toBe(
      messages.pilotIdentity.oversizedPilotPhoto,
    );
  });

  it('accepts an image file at the configured size limit', () => {
    const maximumImageSize =
      flightApplicationFormLimits.image.maxSizeInMegabytes * bytesPerMegabyte;

    const file = new File([new Uint8Array(maximumImageSize)], 'pilot.png', {
      type: 'image/png',
    });

    const result = imageFileSchema.safeParse(file);

    expect(result.success).toBe(true);
  });
});
