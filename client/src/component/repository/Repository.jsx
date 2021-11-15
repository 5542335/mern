import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import GitHubIcon from '@material-ui/icons/GitHub';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch, useSelector } from 'react-redux';

import { SimpleTab } from './components/TabPanel';
import { ChartLanguage } from './components/Diagram';
import styles from './repository.module.css';
import { SimpleBackdrop } from '../shared/loading/BackDrop';
import { getRepositoryQuery } from '../../queries/githubQueryForRepository';
import { Comments } from './components/comments/Comments';
import { useReadme } from './hooks/useReadme';
import { updateCurrentRepository } from '../../store/actions/repositories/actionTypes';
import { alertAction } from '../../store/actions/alert/index';
import { useHandleFavorite } from './hooks/useHandleFavorite';

export const Repository = ({ location }) => {
  const { token } = useSelector((state) => state);
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [_, owner, name] = location.pathname.split('/');
  const { data, loading } = useQuery(getRepositoryQuery(name, owner), {
    notifyOnNetworkStatusChange: true,
    onCompleted: (currentRepository) => {
      if (currentRepository !== undefined) {
        dispatch({ payload: currentRepository, type: updateCurrentRepository });
      }
    },
    onError: (error) => {
      dispatch(alertAction(`Что-то пошло не так (${error.message})`, true, 'error'));
    },
  });

  const { heart, handleHeartClickLike } = useHandleFavorite(data);
  const readme = useReadme(owner, name);

  const Tabs = useMemo(
    () => [
      {
        content: () => <ReactMarkdown remarkPlugins={[gfm]}>{readme}</ReactMarkdown>,
        tabName: 'Readme',
      },
      {
        content: () => <Comments />,
        tabName: 'Comments',
      },
    ],
    [readme],
  );

  if (loading) {
    return <SimpleBackdrop />;
  }

  return (
    <>
      <div className={styles.repHeader}>
        <Chip
          id={styles.chip}
          color="secondary"
          icon={<GitHubIcon />}
          label={`Репозиторий ${name} на GitHub`}
          component="a"
          href={`https://github.com/${owner}/${name}`}
          clickable
        />
        <img src={data?.repository.openGraphImageUrl} alt="" id={styles.repoImg} />
        {token ? (
          <div className={styles.heart}>
            <IconButton type="submit" onClick={handleHeartClickLike}>
              <FavoriteTwoToneIcon
                className={heart ? `${styles.likedRepository}` : `${styles.noLikedRepository}`}
                fontSize="medium"
                titleAccess={heart ? 'Убрать из понравившихся' : 'Добавить в понравившиеся'}
              />
            </IconButton>
          </div>
        ) : null}
      </div>
      <div className={styles.repositoryContainer}>
        <div className={styles.readme}>
          <SimpleTab tabs={Tabs} />
        </div>
        <div className={styles.homePage}>
          <div>
            <h3>Домашняя страница</h3>
          </div>
          <div>
            {data?.repository.homepageUrl ? (
              <a href={data?.repository.homepageUrl} target="_blank" rel="noreferrer">
                {data.repository?.homepageUrl}
              </a>
            ) : (
              'Нет данных :('
            )}
          </div>
        </div>
        <div className={styles.topics}>
          <div>
            <h3>Топики</h3>
          </div>
          <div>
            {data?.repository.repositoryTopics.nodes.lenght
              ? data?.repository.repositoryTopics.nodes?.reduce(
                  (result, { topic }) => `${result}, ${topic.name}`.replace(/^,*/, ''),
                  '',
                )
              : 'Нет данных :('}
          </div>
        </div>
        <div className={styles.language}>
          <div>
            <h3>Языки программирования</h3>
          </div>
          <div>
            <ChartLanguage edges={data?.repository?.languages.edges} />
          </div>
        </div>
        <div className={styles.rate}>
          <div>
            <h3>Рейтинг на GitHub</h3>

            <div>
              {data?.repository.stargazerCount}
              <StarBorderIcon fontSize="small" style={{ height: '14px' }} />
            </div>
          </div>
        </div>
        <div className={styles.diskUsage}>
          <div>
            <h3>Места на диске</h3>
          </div>
          <div>{data?.repository.diskUsage} кБайт</div>
        </div>
        <div className={styles.createdAt}>
          <div>
            <h3>Создан</h3>
          </div>
          <div>{data?.repository.createdAt}</div>
        </div>
        <div className={styles.subsribe}>
          <div>
            <h3>Подписчиков</h3>
          </div>
          <div>{data?.repository.watchers.totalCount}</div>
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
