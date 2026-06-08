import { z } from 'zod';

import { flightApplicationFormLimits } from '@/shared/config/flightApplicationFormLimits';
import { flightApplicationValidationMessages as messages } from './flightApplicationValidationMessages';

const bytesPerMegabyte = 1024 * 1024;

export const imageFileSchema = z
  .preprocess(
    normalizeImageFileInput,
    z.custom<File>((value) => isFile(value), {
      message: messages.pilotIdentity.missingPilotPhoto,
    }),
  )
  .refine((file) => isAcceptedImageType(file.type), {
    message: messages.pilotIdentity.invalidPilotPhotoType,
  })
  .refine((file) => isAcceptedImageSize(file.size), {
    message: messages.pilotIdentity.oversizedPilotPhoto,
  });

function normalizeImageFileInput(value: unknown) {
  if (isFile(value)) {
    return value;
  }

  if (isFileList(value)) {
    return getFirstFileFromFileList(value);
  }

  return value;
}

function getFirstFileFromFileList(fileList: FileList) {
  const file = fileList.item(0);

  if (!file || isEmptyFile(file)) {
    return undefined;
  }

  return file;
}

function isFile(value: unknown): value is File {
  return typeof File !== 'undefined' && value instanceof File;
}

function isFileList(value: unknown): value is FileList {
  return typeof FileList !== 'undefined' && value instanceof FileList;
}

function isEmptyFile(file: File) {
  return file.name.length === 0 && file.size === 0;
}

function isAcceptedImageType(mimeType: string) {
  return flightApplicationFormLimits.image.acceptedMimeTypes.some(
    (acceptedMimeType) => acceptedMimeType === mimeType,
  );
}

function isAcceptedImageSize(sizeInBytes: number) {
  const maxSizeInBytes =
    flightApplicationFormLimits.image.maxSizeInMegabytes * bytesPerMegabyte;

  return sizeInBytes <= maxSizeInBytes;
}
