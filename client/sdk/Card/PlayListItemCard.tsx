import styles from './style.module.scss'

import { CardContent, CardMedia, Grid, Typography, Divider } from '@mui/material'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { Card } from './index'

export type PlayListItemCardProps = {
  image: string
  title: string
  viewCount: string
  likeCount: string
  commentCount: string
  publishedAt: string
}
export const PlayListItemCard = (props: PlayListItemCardProps) => {
  const { image, title, viewCount, likeCount, commentCount, publishedAt } = props
  return (
    <>
      <Card className={styles.PlayListItemCard}>
        <CardMedia className={styles.CardMedia} image={image} />
        <CardContent className={styles.CardContent}>
          <Typography className={styles.Title}>{title}</Typography>
          <Typography className={styles.Subhead}>
            <ul>
              <li>{viewCount}</li>
              <li>{likeCount}</li>
              <li>{commentCount}</li>
              <li>{publishedAt}</li>
            </ul>
          </Typography>
          <YouTubeIcon className={styles.YoutubeIcon}></YouTubeIcon>
        </CardContent>
        <Divider className={styles.line} />
      </Card>
    </>
  )
}
