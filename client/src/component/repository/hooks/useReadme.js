import { useEffect, useState } from 'react';

export const useReadme = (owner, name) => {
  const [readme, setReadme] = useState('');

  useEffect(() => {
    const fetchReadme = async () => {
      const readmeRaw = await fetch(`https://raw.githubusercontent.com/${owner}/${name}/master/README.md`);
      const readmeJSON = await readmeRaw.text();

      setReadme(readmeJSON);
    };

    fetchReadme();
  }, [name, owner]);

  return readme;
};
