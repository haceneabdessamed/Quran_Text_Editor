<?php


$html = '
<style lang="ar">
div.mpdf_index_main {
	font-family: xbriyaz;
}
div.mpdf_index_entry {
	font-family: xbriyaz;
}
div.mpdf_index_letter {
	font-family: xbriyaz;
}
</style>


<body lang="ar">

<p style="font-family:arabtype;font-size:25px;text-align: center;"  dir="rtl"><strong><span dir="RTL">خطبة الرسول صلى الله عليه و سلم في حجة الوداع</span></strong><br />
<br />
 </p>
<p style="font-family:arabtype;font-size:23px;"  dir="rtl"><span dir="RTL">الحمدُ لله نحمدُهُ وَنَسْتَعِينُه، ونَسْتَغْفِرُهُ، ونَتُوبُ إليه، ونَعُوذُ باللهِ مِنْ شُرورِ أنْفُسِنا ومِنْ سيّئآتِ أعْمَالِنَا مَن يَهْدِ اللهُ فَلا مُضِلَّ لَهُ، ومَنْ يُضَلِلْ فَلاَ هَادِيَ لَهُ . وأشهد أن لا إله إلاّ الله وحْده لا شريك له، وأنّ محمداً عبدُه ورسولُه. أوصيكُم عبادَ الله بتقوى الله،وأحثّكم على طاعته! وأستفتح بالذي هو خير. أَمَّا بعد، أيّهَا النّاس، اسْمَعُوا منّي أُبّينْ لَكُمْ، فَإنّيَ لاَ أَدْرِي، لعَليّ لاَ أَلْقَاكُمْ بَعْدَ عَامي هَذَا، في مَوْقِفي هذا، أَيُهَا النَّاس، إنّ دِمَاءَكُمْ وَأمْوَالَكُمْ وَأَعْرَاضَكُمْ عَليكُمْ حَرَامٌ إلى أنْ تَلْقَوْا رَبَّكُمْ، كَحُرمَةِ يَوْمِكُمْ هَذَا في شَهْرِ كُمْ هَذَا في بَلَدِكُم هَذَا وإنكم ستلقون ربكم فيسألكم عن أعمالكم وقد بلغت ، فَمَنْ كَانَتْ عِنْدَهُ أَمَانةٌ فليؤُدِّها إلى مَنْ ائْتمَنَهُ عَلَيها، وإن كل ربا موضوع ولكن لكم رءوس أموالكم لا تظلمون ولا تظلمون ، و قضى الله أنه لا ربا ، وإن ربا عمي العباس بن عبد المطلب موضوع كله وأن كل دم كان في الجاهلية موضوع وإن أول دمائكم أضع دم عامر ابن ربيعة بن الحارث بن عبد المطلب ، فهو أول ما أبدأ به من دماء الجاهلية ، وإن مآثر الجاهلية موضوعة غير السدانة والسقاية والعمد قَوَدٌ ، وشبه العمد ما قتل بالعصا والحجر وفيه مائة بعير فمن ازداد فهو من الجاهلية. أما بعد أيها الناس فإن الشيطان قد يئس من أن يعبد بأرضكم هذه أبدا ولكنه إن يطع فيما سوى ذلك فقد رضي به بما تحقرون من أعمالكم فاحذروه على دينكم أيها الناس</span></p>
<div>
<div contenteditable="false" dir="rtl" style="font-family:kfgqpcuthmanicscriptnaskh;font-size:19px;">[ إِنَّمَا النَّسِيءُ زِيَادَةٌ فِي الْكُفْرِ ۖ يُضَلُّ بِهِ الَّذِينَ كَفَرُوا يُحِلُّونَهُ عَامًا وَيُحَرِّمُونَهُ عَامًا لِيُوَاطِئُوا عِدَّةَ مَا حَرَّمَ اللَّهُ فَيُحِلُّوا مَا حَرَّمَ اللَّهُ ۚ زُيِّنَ لَهُمْ سُوءُ أَعْمَالِهِمْ ۗ وَاللَّهُ لَا يَهْدِي الْقَوْمَ الْكَافِرِينَ 37 ] (التوبة 37 - 37 )</div>
</div>

</body>
';

//==============================================================
	// Set Header and Footer
	$h = array (
  'odd' => 
  array (
    'R' => 
    array (
      'content' => '{PAGENO}',
      'font-size' => 8,
      'font-style' => 'B',
    ),
    'L' => 
    array (
      'content' => "الكاتب القرآني",
      'font-size' => 8,
      'font-style' => 'B',
    ),
    'line' => 1,
  ),
  'even' => 
  array (
    'L' => 
    array (
      'content' => '{PAGENO}',
      'font-size' => 8,
      'font-style' => 'B',
    ),
    'R' => 
    array (
      'content' => "الكاتب القرآني",
      'font-size' => 8,
      'font-style' => 'B',
    ),
    'line' => 1,
  ),
);

	$f = array (
  'odd' => 
  array (
    'L' => 
    array (
      'content' => '{DATE Y-m-d}',
      'font-size' => 8,
      'font-style' => 'BI',
    ),
    'C' => 
    array (
      'content' => '- {PAGENO} -',
      'font-size' => 8,
    ),
    'R' => 
    array (
      'content' => "الموقع الرسمي : www.QuranTextEditor.org",
      'font-size' => 8,
      'font-style' => 'B',
    ),
    'line' => 1,
  ),
  'even' => 
  array (
    'L' => 
    array (
      'content' => "الموقع الرسمي : www.QuranTextEditor.org",
      'font-size' => 8,
      'font-style' => 'B',
    ),
    'C' => 
    array (
      'content' => '- {PAGENO} -',
      'font-size' => 8,
    ),
    'R' => 
    array (
      'content' => '{DATE Y-m-d}',
      'font-size' => 8,
      'font-style' => 'BI',
    ),
    'line' => 1,
  ),
);

//==============================================================
//==============================================================
include("../mpdf.php");

$mpdf=new mPDF('','A4','','',32,25,27,25,16,13); 

$mpdf->SetDirectionality('rtl');
$mpdf->mirrorMargins = true;
$mpdf->SetDisplayMode('fullpage','two');

$mpdf->autoLangToFont = true;

$mpdf->defaultPageNumStyle = 'arabic-indic';

$mpdf->setHeader($h);
$mpdf->setFooter($f);

$mpdf->debug = true;

$stylesheet = file_get_contents('mpdfstyletables.css');
$mpdf->WriteHTML('',1);	// The parameter 1 tells that this is css/style only and no body/html/text

$mpdf->WriteHTML($html);





$mpdf->Output();
exit;
//==============================================================
//==============================================================
//==============================================================


?>