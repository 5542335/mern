import { useCallback, useState } from 'react';

export default () => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('');

  const searchName = useCallback((e) => setName(e.target.value), [setName]);
  const searchTopic = useCallback((e) => setTopic(e.target.value), [setTopic]);
  const searchLanguage = useCallback((e) => setLanguage(e.target.value), [setLanguage]);

  return {
    language,
    name,
    searchLanguage,
    searchName,
    searchTopic,
    topic,
  };
};
