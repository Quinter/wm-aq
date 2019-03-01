import React from 'react';

export const Page = (props) => {
  return (
		<div className={`page ${props.className}`}>
			{props.children}
		</div>
  );
}