import { UnistylesValues } from 'react-native-unistyles';

/* -------------------------------------------------------------------------------------------------
 * StylesheetVariants
 * -----------------------------------------------------------------------------------------------*/

type StylesheetVariantValues = Omit<UnistylesValues, 'variants'>;

type StylesheetVariants<TVariants extends string> =
  | Record<TVariants | 'default', StylesheetVariantValues>
  | Record<TVariants, StylesheetVariantValues>;

type StylesheetVariantsBoolean = StylesheetVariants<'true' | 'false'>;

/* -----------------------------------------------------------------------------------------------*/

export type { StylesheetVariants, StylesheetVariantsBoolean };
