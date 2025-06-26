"use client"

export function MultiChainStatus() {
  const chains = ["DESO", "MUSE", "Aleo", "Stellar", "Avalanche", "Pi", "Diamond", "NFTz"]
  return (
    <ul className="grid grid-cols-2 gap-2 text-sm">
      {chains.map((c) => (
        <li key={c} className="rounded border px-2 py-1">
          {c}: <span className="text-green-600">Connected</span>
        </li>
      ))}
    </ul>
  )
}
