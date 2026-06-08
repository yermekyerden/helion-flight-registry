import { z } from 'zod';

import { formLimits } from '../../../config/formLimits';
import { flightApplicationValidationMessages as messages } from './flightApplicationValidationMessages';

const bytesPerMegabyte = 1024 * 1024;

export const imageFileSchema = z
  .custom<File>((value) => isFile(value), {
    message: messages.pilotIdentity.missingPilotPhoto,
  })
  .refine((file) => isAcceptedImageType(file.type), {
    message: messages.pilotIdentity.invalidPilotPhotoType,
  })
  .refine((file) => isAcceptedImageSize(file.size), {
    message: messages.pilotIdentity.oversizedPilotPhoto,
  });

function isFile(value: unknown): value is File {
  return typeof File !== 'undefined' && value instanceof File;
}

function isAcceptedImageType(mimeType: string) {
  return formLimits.image.acceptedMimeTypes.some(
    (acceptedMimeType) => acceptedMimeType === mimeType,
  );
}

function isAcceptedImageSize(sizeInBytes: number) {
  const maxSizeInBytes = formLimits.image.maxSizeInMegabytes * bytesPerMegabyte;

  return sizeInBytes <= maxSizeInBytes;
}
