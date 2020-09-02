
<h2 style="height: 60px; line-height: 60px; margin-left: 70px; font-weight: 500; border: none;">VEX Template'inin giydirilmesi</h2>

<h2>Karşılaşılan Problemler</h2>
- Refresh metodu bulunmadığı için entegre edilen token refresh kaldırıldı. Başlangıç'a login eklendi fakat ilk requestte sağlıksız çalışıyor. Sayfayı yenilemek gerekiyor. 
- Grafik gösterimi konusunda anlayamadığım kısımlar oldu. MonthlyReport servisini kullanmam beklenmiyordu sanırım ama önce anlayamayıp entegre ettim, sonrasında comment'e aldım. 
  -- Her iki serviste de input olarak startDate ve endDate mevcut değil, bu durumda tüm datayı çekip filtrelemek gerektiğini düşündüm ancak servisten yalnızca bir aylık data geliyor. Bu nedenle tarih filtresini eklemedim. Günlük ve Aylık Toggle Button monthly report'u da çekmek için gerekli sanırım, başlangıçta onu da ekleyip dailyReport ve monthlyReport olarak her iki serviside çağırdım, sonrasında bunu kaldırdım.
  -- Servisten dönen değerlerde Toplam değeri de olduğu için bu değeri kaldırdım.
  -- Genel olarak grafikle ilgili daha detaylı açıklama gerekiyordu ancak yine zaman kısıtı sebebiyle hızlıca elimden geldiği kadar temel kabiliyetleri göstermeye çalıştım.
- Zamanım kısıtlı olduğu için Loader ve Alert servislerini implement etmedim.
- Authenticate servisini detaylı olarak yazmadığım için kullanıcı adı kısmını eklemedim.
