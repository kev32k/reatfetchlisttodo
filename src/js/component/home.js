import React, { useState, useEffect } from "react";

export function Home() {
	const [list, setlist] = useState([]);
	let url = "https://assets.breatheco.de/apis/fake/todos/user/kev32k";

	function handleEvent(e) {
		if (e.key === "Enter") {
			setlist([...list, { label: e.target.value, done: false }]);
		}
	}

	const removeItem = indexItem => {
		setlist(prevState =>
			prevState.filter((todo, index) => index !== indexItem)
		);
	};

	const updateList = theList => {
		fetch(url, {
			headers: { "Content-Type": "application/json" },
			method: "PUT",
			body: JSON.stringify(theList)
		})
			.then(response => response.json())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
	};

	async function deleteALL() {
		//delete
		await fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));

		//POST

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify([]);

		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			body: raw
		};

		await fetch(url, requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));

		//GET
		fetch(url)
			.then(response => response.json())
			.then(result => setlist(result))
			.catch(error => console.log("error", error));
	}

	useEffect(() => {
		fetch(url)
			.then(response => response.json())
			.then(result => setlist(result))
			.catch(error => console.log("error", error));
	}, []);

	useEffect(() => {
		updateList(list);
	}, [list]);

	return (
		<div className="container">
			<div className="box">
				<h1>Todo List</h1>

				<input
					type="text"
					placeholder="Fill"
					onKeyDown={event => handleEvent(event)}
					className="m-2"
				/>
				<button
					className="button2 btn  m-3"
					onClick={() => deleteALL()}>
					Delete List
				</button>
				<div className="list-container">
					<ul>
						{list.map((item, index) => {
							return (
								<div className="list-box" key={index}>
									<li>{item.label}</li>
									<button
										className="button1 btn"
										onClick={() => removeItem(index)}>
										X
									</button>
								</div>
							);
						})}
						<div id="espacio"></div>
						<p>{list.length + "   item added"}</p>
						<div id="espacio"></div>
					</ul>
				</div>
			</div>
		</div>
	);
}
