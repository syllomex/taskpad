import { Page } from '../store/pages';
import { format } from 'date-fns';

export default function downloadData(data: any) {
	const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'json' });
	const a = document.createElement('a');
	a.href = URL.createObjectURL(blob);
	a.download = `taskpad-backup-${format(new Date(), 'ddMMyyyyHHmm')}.json`;
	a.click();
	a.remove();
}

export function uploadData(file: File, setState: React.Dispatch<Page[]>) {
	const reader = new FileReader();
	reader.readAsText(file);

	return (reader.onload = (event): Object | undefined => {
		const result = event.target?.result;
		if (!result) return;

		setState(JSON.parse(result.toString()));
	});
}
