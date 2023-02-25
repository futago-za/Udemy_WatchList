import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextBoxWidhCopyButton from './TextBoxWithCopyButton';
import Button from '@mui/material/Button';

const CourseCard = (props) => {

  const handleClickButton = () => {
    props.deleteFunc(props.course.id)
  }

  return (
    <Card sx={{ display: 'flex'}}>
      <CardMedia
        component="img"
        sx={{ width: "30%" }}
        image={props.course.image_path}
        alt="Thumbnail"
      />
      <div style={{ display: "flex", flexDirection: 'column', justifyContent: "space-between", width: "70%"}}>
        <CardContent>
          <Typography variant="h6" component="div">
            {props.course.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            セクションの数: {props.course.sections.length} • 総時間：{props.course.total_time}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-end', paddingRight: '20px'}}>
            <TextBoxWidhCopyButton text={props.course.url} />
            <Button variant="contained" color="error" onClick={handleClickButton}>完了 / 削除</Button>
          </div>
        </CardActions>
      </div>
    </Card>
  );
}

export default CourseCard;