import Shade from './shade';

const LightColors = {
  primary: Shade.red.main,
  onPrimary: Shade.white.main,
  primaryContainer: Shade.red.light,
  onPrimaryContainer: Shade.red.dark,
  secondary: Shade.gray.main,
  onSecondary: Shade.white.main,
  secondaryContainer: Shade.gray.light,
  onSecondaryContainer: Shade.black.main,
  background: Shade.white.main,
  onBackground: Shade.black.light,
  surface: Shade.gray.light,
  onSurface: Shade.black.main,
  outline: Shade.gray.main,
  error: Shade.red.dark,
  onError: Shade.white.main,
  errorContainer: '#ffd6d6',
  onErrorContainer: Shade.red.dark,
};

const DarkColors = {
  primary: Shade.red.main,
  onPrimary: Shade.white.main,
  primaryContainer: Shade.red.dark,
  onPrimaryContainer: Shade.red.light,
  secondary: Shade.gray.dark,
  onSecondary: Shade.white.main,
  secondaryContainer: Shade.gray.main,
  onSecondaryContainer: Shade.black.light,
  background: Shade.black.light,
  onBackground: Shade.white.main,
  surface: Shade.gray.dark,
  onSurface: Shade.white.main,
  outline: Shade.gray.main,
  error: Shade.red.main,
  onError: Shade.white.main,
  errorContainer: Shade.red.dark,
  onErrorContainer: Shade.white.main,
};

export { LightColors, DarkColors };
