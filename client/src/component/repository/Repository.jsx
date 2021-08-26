import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import GitHubIcon from '@material-ui/icons/GitHub';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import IconButton from '@material-ui/core/IconButton';

import { SimpleTab } from './components/TabPanel';
import { ChartLanguage } from './components/Diagram';
import './repository.css';
import { SimpleBackdrop } from '../shared/loading/BackDrop';
import { getRepositoryQuery } from '../../queries/githubQueries';
import { Comments } from './components/comments/Comments';

export const Repository = ({ location }) => {
  // eslint-disable-next-line no-unused-vars
  const [_, owner, name] = location.pathname.split('/');
  const { data, loading, error } = useQuery(getRepositoryQuery(name, owner));
  const [readme, setReadme] = useState('');
  const [heart, setHeart] = useState(false);

  const likeValues = { likedRepositories: `${data?.repository.id}`, userEmail: 'alex@mail.ru' };

  const handleHeartClickLike = useCallback(async () => {
    const response = await fetch('/api/likedRepo/like', {
      body: JSON.stringify(likeValues),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      method: 'POST',
    });

    if (response.ok) {
      setHeart(true);
    }
  });

  const handleHeartClickDislike = useCallback(() => {
    setHeart(false);
  }, []);

  useEffect(() => {
    const fetchReadme = async () => {
      const readmeRaw = await fetch(`https://raw.githubusercontent.com/${owner}/${name}/master/README.md`);
      const readmeJSON = await readmeRaw.text();

      setReadme(readmeJSON);
    };

    fetchReadme();
  }, []);

  if (loading) {
    return <SimpleBackdrop />;
  }

  if (error) return `Error! ${error.message}`;

  return (
    <>
      <div className="repHeader">
        <Chip
          id="chip"
          color="secondary"
          icon={<GitHubIcon />}
          label={`Репозиторий ${name} на GitHub`}
          component="a"
          href={`https://github.com/${owner}/${name}`}
          clickable
        />
        <img src={data.repository.openGraphImageUrl} alt="" id="repoImg" />
        <div className="heart">
          <IconButton type="submit">
            {heart ? (
              <FavoriteIcon color="error" fontSize="medium" onClick={handleHeartClickDislike} />
            ) : (
              <FavoriteBorderOutlinedIcon fontSize="medium" onClick={handleHeartClickLike} />
            )}
          </IconButton>
        </div>
      </div>
      <div className="repository-container">
        <div className="readme">
          <SimpleTab
            tabs={[
              {
                content: () => <ReactMarkdown remarkPlugins={[gfm]}>{readme}</ReactMarkdown>,
                tabName: 'Readme',
              },
              {
                content: () => <Comments repoId={data.repository.id} />,
                tabName: 'Comments',
              },
            ]}
          />
        </div>
        <div className="homePage">
          <div>
            <h3>Домашняя страница</h3>
          </div>
          <div>
            {data.repository.homepageUrl ? (
              <a href={data.repository.homepageUrl} target="_blank" rel="noreferrer">
                {data.repository?.homepageUrl}
              </a>
            ) : (
              'Нет данных :('
            )}
          </div>
        </div>
        <div className="topics">
          <div>
            <h3>Топики</h3>
          </div>
          <div>
            {data.repository.repositoryTopics.nodes.lenght
              ? data.repository.repositoryTopics.nodes?.reduce(
                  (result, { topic }) => `${result}, ${topic.name}`.replace(/^,*/, ''),
                  '',
                )
              : 'Нет данных :('}
          </div>
        </div>
        <div className="language">
          <div>
            <h3>Языки программирования</h3>
          </div>
          <div>
            <ChartLanguage edges={data.repository.languages.edges} />
          </div>
        </div>
        <div className="rate">
          <div>
            <h3>Рейтинг на GitHub</h3>

            <div>
              {data.repository.stargazerCount}
              <StarBorderIcon fontSize="small" style={{ height: '14px' }} />
            </div>
          </div>
        </div>
        <div className="diskUsage">
          <div>
            <h3>Места на диске</h3>
          </div>
          <div>{data.repository.diskUsage} кБайт</div>
        </div>
        <div className="createdAt">
          <div>
            <h3>Создан</h3>
          </div>
          <div>{data.repository.createdAt}</div>
        </div>
        <div className="subsribe">
          <div>
            <h3>Подписчиков</h3>
          </div>
          <div>{data.repository.watchers.totalCount}</div>
        </div>
      </div>
    </>
  );
};

Repository.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
