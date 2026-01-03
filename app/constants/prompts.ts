export const FOOTBALL_ANALYSIS_PROMPT = `
Sana yazağım verileri analiz et ve iki takım arasında oynacak önümüzdeki maç için bir tahmin yap. Yazacaklarım şu verileri şunları içeriyor: Takımların istatistikleri, sakat ve cezalı oyuncular, oynanacak bu maç için bir bahis sitesindeki oranlar, maçın nerede oynanacağı, maçın hangi hakem tarafından yönetileceği ve hangi kanallarda yayınlanacağı. Tüm veriler birbiri ile ilişkili yani aynı bağlamda. Dolayısıyla tüm verileri harmanlayıp analiz yap. Tahminlerini aşağıdaki başlıklar üzerinden açıkla. Tüm metini Türkçe yaz.

1. Başlık "Karşılaşma Bilgileri". Bu başlığın altında sana yazdığım verilere bakarak maçın oynanacak tarihi, maçın hakemi, hangi stadda oynanacağı, tvInfo alanında belirtildiği şekilde maçın hangi kanallarda yayınlanacağı bilgisini yazacaksın. Yazacağın şey örneğin şuna benzer olmalı "X ve Y karşılaşması (X yerine ev sahibi takım, Y yerine deplasman takım gelecek) GÜN AY YIL (Ay rakamlar yerine yazıyla olmalı) tarihinde saat XXX'de/da (Türkiye saatine çevir) XXX stadında oynanacak. Mücadelenin hakemi XXX olacak ve XXX kanallarında yayınlanacak."

2. Başlık "Muhtemel Kazanan". Bu başlığın altında Sana gönderilen Tüm verileri analiz edip istatistiklere dayanarak sadece hangi takımın kazanacağını ya da berabere kalacağını kısaca yazacaksın, Kısa yaz burada olasıılıklardan falan bahsetme!. Örneğin X takımı kazanır ya da Maç berabere biter. Berabere kalma ihtimali varsa takımların kazanma olasılık yüzdeleri eşit olmalı buna dikkat et. Tüm veriler muhtemel kazananı etkiler bunu unutma.

3. Başlık "Genel Değerlendirmeler", Tüm analiz ettiğin verileri istatistikler ve yüzdeler üzerinden detaylandırıp bu başlığın altında açıkla. Maçın ligdeki yeri, takımların form durumları, taktiksel yaklaşımlarını değerlendirin. Takımların sezon boyunca gösterdiği performans ve stratejileri hakkında yorumlar yapın. Ayrıca, maçın sonucunun her iki takım için ne anlama geldiğini ve oyuncuların maç sırasındaki potansiyel davranışlarını tahmin edin. Bu konular hakkında bir paragraf yaz.

Ayrıca şunları maddeler halinde listele:
- Takımların mevcut ligde veya başka ligde olan durumlarını değerlendir ve açıkla.
- Galibiyet-mağlubiyet sayılarını yaz
- İlk yarı skor değerlendirmeleri yap ve açıkla
- Karşılıklı gol ihtimallerini yaz
- Kazanma olasılık yüzdelerini yaz (Beraberlik oranı da dikkate alındığında kazanma olasılıkları toplamı %100'ü geçemez ayrıca maç beraberlikle bitecekse oranların eşit ya da beraberlik oranının diğer oranlardan yüksek olması gerekir)
-  2,5 üst 2,5 alt durumunu yaz
- Toplam gol aralığı durumunu yaz

2. Başlık altında kesinlikle konuyla ilgili analiz/değerlendirme paragrafı bulunmalı.

4. Başlık  "X Takımı Durumu", "Y Takımı Durumu". Bu başlığın altında iki takımı analiz edeceksin, takımların performans durumları, son zamanlarda nasıl bir oyun anlayışına sahip olduğu, oynanacak karşılaşma liginde ve diğer ligdeki durumlarını değerlendir ve açıkla (paragraf olarak). Önümüzdeki maçta muhtemel gol atabilecek kişileri bu başlık altında yazacaksın (bu tahmini gol atacak kişiler son sezonda o takımda oynayan kişiler olmalı). Önümüzdeki maçta sakat ve cezalı oyuncular varsa bunları alt başlıklar olarak yaz (Sana aşağıda JSON olarak vereceğim bunları). Ayrıca her iki takımın form durumunu yüzdesel olarak hesapla ve bu sonuçları her iki takım için ayrı ayrı yazmanı istiyorum (sana attığım bir JSON verisindeki recentForms alanına bakarak hesaplayabilirsin (burda W-L-D gibi galibiyet, mağlubiyet, beraberlik verileri var).

5. Başlık "Olasılık Matrisi". Karşılaşma için olasılık matrisi çıkar ve alt alta text olarak yaz. X takımı kazanır yüzdesi, Y takımı kazanır yüzdesi, Beraberlik yüzdesi, Toplam gol aralığı yüzdesi, KG var KG yok yüzdesi, Muhtemel gol atacak oyuncular kim ve yüzde kaç ihtimalle önümüzdeki maçta gol atar. (Beraberlik oranı da dikkate alındığında kazanma olasılıkları toplamı %100'ü geçemez ayrıca maç beraberlikle bitecekse oranların eşit ya da beraberlik oranının diğer oranlardan yüksek olması gerekir). Ayrıca kazanma olasılıkları yukardaki başlıkta bahsettiğinle aynı olmalı tutarlılık için.

Sana ayrıca bu iki takımın sakat oyuncular & cezalı oyuncular listesini vereceğim en sonda, bu oyuncuları analizlerine dahil et sakat ve cezalı olduklarını yaz gerektiği durumda. Yani bir oyuncu sakat ise veya önümüzdeki maçta cezalı ise demek ki gol beklentisi olamaz çünkü maçta oynamayacak. Analizlerini buna göre yap.

Tüm analizlerini yaptıktan sonra tek bir seferde beklediğim yapıda bir metin yaz bana. Parça parça analizlerini yaparken yazma.

Ek olarak Son başlık olan "Ekstra notlar" altında kendi kısa değerlendirmelerini yapabilirsin

İnternet araştırmalarını da dahil et.
`
