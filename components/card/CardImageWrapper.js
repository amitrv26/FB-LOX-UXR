"use client";

import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { setCommentsDialog } from "../../store/appSlice";
import Card from "./Card";
import CardHeader from "./CardHeader";
import Reactions from "./Reactions";
import BlingString from "./BlingString";
import ImagePushLink from "../ImagePushLink";


const CardImageWrapper = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCommentsClick = () => {
    // Generate a unique ID for this post (using image name and timestamp as hash)
    const postId = `${props.info.name}-${props.info.time}-${props.image}`.replace(/\s+/g, '-').toLowerCase();
    
    const dialogData = {
      type: 'image',
      image: props.image,
      images: [props.image],
      info: props.info,
      likes: props.likes,
      comments: props.comments,
      navigation: props.navigation,
      padding: props.padding,
      style: props.style,
      postId: postId,
    };

    // Store post data in map for URL restoration
    if (typeof window !== 'undefined') {
      window.__postDataMap = window.__postDataMap || new Map();
      window.__postDataMap.set(postId, dialogData);
    }

    dispatch(setCommentsDialog(dialogData));
    
    // Update URL with permalink parameter
    const params = new URLSearchParams(searchParams.toString());
    params.set('permalink', postId);
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <Card type="image">
      <CardHeader
        profile={props.info.image}
        name={props.info.name}
        timeago={props.info.time}
      />

      <div className="card-content">
        <p>{props.info.text}</p>
      </div>

      <ImagePushLink
        activeImage={0}
        images={[props.image]}
        info={props.info}
        navigation={props.navigation}
        padding={props.padding}
        style={props.style}
      />

        <Reactions 
          likes={props.likes} 
          comments={props.comments} 
          onCommentsClick={handleCommentsClick}
        />
        <BlingString onCommentClick={handleCommentsClick} />
      </Card>
    )
  }
export default CardImageWrapper;
