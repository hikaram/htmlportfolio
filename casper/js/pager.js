var cur_note = 1;
function MoveNote(count) {
 new_num = cur_note + count;
	new_el = 'note' + new_num;
	cur_el = 'note' + cur_note;
	if (document.getElementById(new_el)) {
		document.getElementById(cur_el).style.display = 'none';
		document.getElementById(new_el).style.display = 'block';
		cur_note = new_num;
		prev_num = cur_note - 1;
		prev_el = 'note' + prev_num;
		if (document.getElementById(prev_el)) {
			document.getElementById('pager_prev').className = 'pager2';
		} else {
		 document.getElementById('pager_prev').className = 'pager';
		}
		next_num = cur_note + 1;
		next_el = 'note' + next_num;
		if (document.getElementById(next_el)) {
			document.getElementById('pager_next').className = 'pager2';
		} else {
		 document.getElementById('pager_next').className = 'pager';
		}
	}
}