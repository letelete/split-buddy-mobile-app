type EmojiName = 'partying-face';

/* -------------------------------------------------------------------------------------------------
 * Emoji
 * -----------------------------------------------------------------------------------------------*/

interface EmojiProps {
  name: EmojiName;
}

const emojiNameToUnicode: Record<EmojiName, number> = {
  'partying-face': 0x1f973,
};

const Emoji = ({ name }: EmojiProps) => {
  return <>{String.fromCodePoint(emojiNameToUnicode[name])}</>;
};

Emoji.displayName = 'Emoji';

/* -----------------------------------------------------------------------------------------------*/

export { Emoji };
export type { EmojiProps };
