export const combineArrays = (header, body) => {
  const result = {};
  header.forEach((key, i) => (result[key] = body[i]));
  return result;
};

export const mapPriority = input => {
  // ({
  //   urgent: 1,
  //   high: 2,
  //   medium: 3,
  //   low: 4,
  //   'No priority': 0,
  // }[input.toLowerCase()] || 0);
  if (!input || isNaN(input) || input < 0) return 0;
  return Math.min(4, 6 - input);
};

export const mapLabel = input =>
  ({
    'zuri flutter app': 'c1219d1a-cd7b-43e5-8534-0aa4226adbc7',
    'company files': '418af7b0-b4d0-4437-b3d5-74475105a495',
    chess: 'fbe5ef1e-8c31-4dea-b025-8b8635c4a5e5',
    'zuri app android': '1bf12f2a-8baa-4c75-81e7-088a4ed40959',
    'zuri desktop': '9d62aec0-8e9c-44df-af80-341e2f3f0cfb',
    'todo plugin': '0145c5e9-d8cb-4cd3-9b2f-02193c529ee7',
    sales: '3c860837-5346-4fd3-85f7-45285611fd7c',
    noticeboard: '0a7f2f57-6fd4-4d11-b09f-d472bb6d8727',
    'music plugin': '02698557-0190-4b72-b058-63eb3eb18601',
    'dm plugin': 'f1753e59-b1c1-4575-a429-126a991c024a',
    'contribution tracker': 'b05dedd0-5009-469c-8592-4e6cca068931',
    'company goals': '76d85aa9-b0dd-49e2-8371-83956d9001d4',
    'zuri main': 'c7681054-8748-4e3b-9322-667d7c36bcc0',
    channels: '8bcfa5de-3099-4a7e-8ff8-7020641677f6',
    devops: '0d8792ee-20fe-48c8-b66c-77173da56327',
    design: 'e0a68102-6d66-432c-80e4-4bafe7b67067',
    bug: 'f93382b5-8b60-4e3a-bdc4-763461427890',
    improvement: '55d59b50-567b-41e4-9b3b-9198e33bbc87',
    feature: '437046d5-5f45-43d9-a393-785b0a15bf88',
    "Zuri Core": 'dec781c9-81e1-420e-8b37-b763232a0168',
  }[input.toLowerCase()] || '55d59b50-567b-41e4-9b3b-9198e33bbc87');

export const labelArrGenerate = (labelArray = '') => {
  const returnArray = labelArray.split(',');
  // return returnArray.map(label => '585142fc-3bb4-447d-97d1-0771b4ebd50a');
  return returnArray.map(label => mapLabel(label.trim()));
};

export const estimateResolver = input => {
  // if (input <= 0) return 0;
  // if (input >= 7) return 7;
  return Math.max(0, Math.min(7, parseFloat(input).toFixed(0)));
};
