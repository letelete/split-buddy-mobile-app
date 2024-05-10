import { UnistylesValues } from 'react-native-unistyles';

type StylesheetVariantValues = Omit<UnistylesValues, 'variants'>;

export type StylesheetVariants<TVariants extends string> =
  | Record<TVariants | 'default', StylesheetVariantValues>
  | Record<TVariants, StylesheetVariantValues>;

export type StylesheetVariantsBoolean = StylesheetVariants<'true' | 'false'>;
