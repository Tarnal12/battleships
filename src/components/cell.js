import React from 'react';

export function Cell(props) {
	return (
		<button className="cell" onClick={props.onClick}>
			{props.value}
		</button>
	);
}
