function renderNFT(nft) {
  return `
    <div class="nft-card" data-id="${nft.id}">
      <img src="${nft.image}" alt="${nft.name}">
      <div class="nft-meta">
        <span>${nft.name}</span>
        <button class="transfer-btn" 
                data-from="paper" 
                data-to="clashers">
          ➔ Battle Ready
        </button>
      </div>
    </div>
  `;
}
