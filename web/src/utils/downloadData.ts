export default function downloadData(data: any) {
	const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'json' });
	const a = document.createElement('a');
	a.href = URL.createObjectURL(blob);
	a.download = 'pages.json';
	a.click();
	a.remove();
}
