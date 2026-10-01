/**
 * Measures text set in Geist Medium so the footer wordmark can be sized to
 * fit its container exactly, whatever name is configured in site.ts.
 * Advance widths are in font units (1000 per em), taken from Geist-Medium.
 */
const ADVANCE: Record<string, number> = {
  "A": 689, "B": 688, "C": 713, "D": 701, "E": 609, "F": 595, "G": 713, "H": 716, "I": 280, "J": 607, "K": 656, "L": 583, "M": 890,
  "N": 745, "O": 751, "P": 657, "Q": 745, "R": 680, "S": 654, "T": 568, "U": 694, "V": 688, "W": 968, "X": 633, "Y": 594, "Z": 561,
  "a": 565, "b": 608, "c": 563, "d": 608, "e": 576, "f": 412, "g": 607, "h": 591, "i": 256, "j": 284, "k": 609, "l": 282, "m": 885,
  "n": 591, "o": 588, "p": 608, "q": 608, "r": 394, "s": 537, "t": 410, "u": 586, "v": 560, "w": 829, "x": 607, "y": 553, "z": 552,
  "0": 673, "1": 406, "2": 630, "3": 625, "4": 629, "5": 641, "6": 604, "7": 531, "8": 624, "9": 606,
  " ": 243, "-": 418, "'": 186, ".": 213, "&": 649,
};

/** Average lowercase advance, used for characters not in the table (accents, etc.). */
const FALLBACK_ADVANCE = 549;

export function measureGeistMedium(text: string, fontSize: number, letterSpacing = 0) {
  let units = 0;
  for (const char of text) units += ADVANCE[char] ?? FALLBACK_ADVANCE;
  return (units * fontSize) / 1000 + letterSpacing * Math.max(0, [...text].length - 1);
}
