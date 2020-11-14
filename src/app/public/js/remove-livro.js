const tabelaDeLivros = document.querySelector('#livros');

tabelaDeLivros.addEventListener('click', event => {
	const clickedElement = event.target;

	if(clickedElement.dataset.type === 'remocao'){
		const livroId = clickedElement.dataset.ref;

		fetch(`http://localhost:3000/livros/${livroId}`, {method: 'DELETE'})
			.then(resp =>{
				const tr = clickedElement.closest(`#livro_${livroId}`);
				tr.remove();
			})
			.catch(err => console.log(err)); 
		 
	}
});