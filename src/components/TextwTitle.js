import React from 'react'
import {withStyles } from 'material-ui/styles';

const TextwTitle = ({label,content}) => {

 return(<div>
     <div className={'text-w-title-label'}>
        {label}
     </div>
     <div className={'text-w-title-content'}>
         {content}
     </div>
 </div>)
};

export default TextwTitle;