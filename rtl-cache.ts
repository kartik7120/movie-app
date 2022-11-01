// rtl-cache.ts
import ltrPlugin from 'stylis-plugin-rtl';
import { createEmotionCache } from '@mantine/core';

export const rtlCache = createEmotionCache({
    key: 'mantine-ltr',
    stylisPlugins: [ltrPlugin],
});