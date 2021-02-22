
import React from 'react';
import {CardHeader, Card, CardMedia, Typography, Avatar, CardContent} from "@material-ui/core"
import Styling from '../styling/Styling'

const News = ({news}) => {
  return (
    <React.Fragment>
        <div className="sub-container">
        <Card className={Styling().subRoot}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={Styling().avatar}>
              {news.author ? news.author.slice(0,1) : ""}
            </Avatar>
          }
          title= {news.title}
          subheader={news.publishAt.split("T")[0]}
        />
        <CardMedia
          className={Styling().media}
          image={news.urlToImage}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {news.description}
          </Typography>
        </CardContent>
        </Card>
      </div>
    </React.Fragment>
  )
}

export default News;