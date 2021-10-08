import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import GitHubIcon from '@material-ui/icons/GitHub';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import IconButton from '@material-ui/core/IconButton';
import { useSelector } from 'react-redux';

import { SimpleTab } from './components/TabPanel';
import { ChartLanguage } from './components/Diagram';
import './repository.css';
import { SimpleBackdrop } from '../shared/loading/BackDrop';
import { getRepositoryQuery } from '../../queries/githubGetRepoQuery';
import { Comments } from './components/comments/Comments';
import { useReadme } from './hooks/useReadme';

export const Repository = ({ location }) => {
  const tokenStore = useSelector((state) => state.token);
  // eslint-disable-next-line no-unused-vars
  const [_, owner, name] = location.pathname.split('/');
  const { data, loading, error } = useQuery(getRepositoryQuery(name, owner));
  const [heart, setHeart] = useState(false);
  const readme = useReadme(owner, name);

  const values = { repositoryId: `${data?.repository.id}`, token: tokenStore };
  const fetchLikeRepo = useCallback(
    async (path, heartState) => {
      const response = await fetch(`/api/user/${path}?token=${tokenStore}`, {
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        method: 'PATCH',
      });

      if (response.ok) {
        setHeart(heartState);
      }
    },
    [values],
  );

  const handleHeartClickLike = useCallback(async () => {
    if (heart) {
      fetchLikeRepo('dislike', false);
    } else {
      fetchLikeRepo('like', true);
    }
  });

  useEffect(() => {
    if (data && tokenStore) {
      const fetchLike = async () => {
        const response = await fetch(`/api/user/getLike?token=${tokenStore}`, {
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          method: 'POST',
        });

        if ((await response.text()) === 'true') {
          setHeart(true);
        }
      };

      fetchLike();
    }
  }, [tokenStore, data]);

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
        {tokenStore ? (
          <div className="heart">
            <IconButton type="submit">
              <FavoriteTwoToneIcon
                className={heart ? 'liked-repository' : 'no-liked-repository'}
                fontSize="medium"
                titleAccess={heart ? 'Убрать из понравившихся' : 'Добавить в понравившиеся'}
                onClick={handleHeartClickLike}
              />
            </IconButton>
          </div>
        ) : null}
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
