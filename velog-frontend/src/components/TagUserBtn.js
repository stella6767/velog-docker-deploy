import { Tag } from 'antd';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const TagUserBtn = memo((props) => {
  const { tag } = props;

  return (
    <>
      <Link>
        <Tag>
          <span>{tag.name}</span>
        </Tag>
      </Link>
    </>
  );
});

export default TagUserBtn;
