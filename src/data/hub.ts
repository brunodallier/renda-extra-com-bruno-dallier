export const minuteCompatibleModels = [
  {
    manufacturer: 'iPhone',
    models: [
      'iPhone 12', 'iPhone 12 Mini', 'iPhone 12 Pro', 'iPhone 12 Pro Max',
      'iPhone 13', 'iPhone 13 Mini', 'iPhone 13 Pro', 'iPhone 13 Pro Max',
      'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max',
      'iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max',
      'iPhone 16', 'iPhone 16 Plus', 'iPhone 16 Pro', 'iPhone 16 Pro Max',
      'iPhone 17', 'iPhone 17 Plus', 'iPhone 17 Pro', 'iPhone 17 Pro Max',
    ],
  },
  {
    manufacturer: 'Google Pixel',
    models: [
      'Pixel 6', 'Pixel 6 Pro', 'Pixel 6a',
      'Pixel 7', 'Pixel 7 Pro', 'Pixel 7a',
      'Pixel 8', 'Pixel 8 Pro', 'Pixel 8a',
      'Pixel 9', 'Pixel 9 Pro', 'Pixel 9 Pro XL', 'Pixel 9 Pro Fold', 'Pixel Fold',
    ],
  },
  {
    manufacturer: 'Samsung Galaxy',
    models: [
      'Galaxy S21', 'Galaxy S21 Plus', 'Galaxy S21 Ultra', 'Galaxy S21 FE',
      'Galaxy S22', 'Galaxy S22 Plus', 'Galaxy S22 Ultra', 'Galaxy S22 FE',
      'Galaxy S23', 'Galaxy S23 Plus', 'Galaxy S23 Ultra', 'Galaxy S23 FE',
      'Galaxy S24', 'Galaxy S24 Plus', 'Galaxy S24 Ultra', 'Galaxy S24 FE',
      'Galaxy S25', 'Galaxy S25 Plus', 'Galaxy S25 Ultra', 'Galaxy S25 FE', 'Galaxy S26+',
    ],
  },
] as const

export const hubCaptureAcceptedDevices = [
  { manufacturer: 'Apple', models: ['iPhone 11'] },
  { manufacturer: 'Motorola', models: ['Edge Fusion 60', 'Edge 20'] },
  { manufacturer: 'Oppo', models: ['A5 Pro'] },
  { manufacturer: 'Samsung', models: ['A54', 'A17'] },
  { manufacturer: 'Xiaomi', models: ['Redmi Note 14'] },
] as const

export const hubCaptureRejectedDevices = [
  { manufacturer: 'Xiaomi', models: ['Redmi 13'] },
] as const

export const hubConfig = {
  registrationLink: 'https://ai.hub.xyz/r/SITEBR',
  registrationTutorialLink: 'https://www.youtube.com/watch?v=SQo0S4lg0LA',
  minuteAndroidLink: 'https://play.google.com/store/apps/details?id=com.bakerdata.minute&hl=pt',
  minuteIosLink: 'https://apps.apple.com/br/app/minute-data/id6760918280',
  hubCaptureAndroidLink: 'https://play.google.com/store/apps/details?id=xyz.hub.mobile',
  hubCaptureIosLink: 'https://apps.apple.com/us/app/hub-capture/id6772285040',
  minuteCompatibleFamilies: [
    'iPhone 12 ou superior',
    'Samsung Galaxy S21 ou superior',
    'Google Pixel 6 ou superior',
  ],
} as const
