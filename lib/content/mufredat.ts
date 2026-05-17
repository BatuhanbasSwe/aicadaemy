import type { CharacterId } from "@/lib/types";

export interface MufredatTopic {
  id: string;
  title: string;
  explanation: string;
  sampleQs?: string[];
}

export interface MufredatUnit {
  id: string;
  title: string;
  topics: MufredatTopic[];
  questions?: string[];
}

export interface MufredatSubject {
  id: CharacterId;
  name: string;
  emoji: string;
  color: string;
  bg: string;
  units: MufredatUnit[];
}

export const MUFREDAT: MufredatSubject[] = [
  {
    id: "yunus_emre",
    name: "Türkçe",
    emoji: "📜",
    color: "#E8B83A",
    bg: "bg-sun-100",
    units: [
      {
        id: "turkce-1",
        title: "1. Tema: Erdemler",
        questions: [
          "\"Tuzağa Düşen Ceylan\" adlı hikâyenin ana teması nedir?",
          "\"Forsa\" metninde yazar okuyucuya hangi duyguyu vermek istemektedir?",
          "\"Sevmek\" sözcüğünün çok anlamlılığına bir örnek cümle yaz.",
          "Anlatıcı bakış açısı ile kahraman bakış açısı arasındaki fark nedir?",
          "Eş anlamlı, zıt anlamlı ve çok anlamlı sözcük kavramlarını örnekle açıkla.",
          "Bir hikâyenin yapısını oluşturan unsurlar (serim, düğüm, çözüm) nelerdir?",
          "\"Dostluğun Değeri\" dinleme metninin ana düşüncesini bir cümleyle yaz.",
          "\"Anadolu'da Tuzun da Bir Sözü Var\" metninde \"tuz\" neyi sembolize etmektedir?",
          "Mecaz anlam ile gerçek anlam arasındaki farkı örnekle açıkla.",
          "Arkadaşlık ve yardımlaşma temalarını bir arada işleyen bir metin türü hangisidir?",
        ],
        topics: [
          {
            id: "turkce-1-1",
            title: "Tuzağa Düşen Ceylan",
            explanation:
              "Bu hikâye, bir ceylanın tuzağa düşmesi üzerinden arkadaşlık ve yardımlaşma gibi erdemleri işler. Metinde geçen sözcüklerin anlam katmanlarını ve yazarın mesajını anlamak önemlidir. LGS'de bu tür hikâyelerden paragraf soruları sıkça çıkar.",
          },
          {
            id: "turkce-1-2",
            title: "Forsa",
            explanation:
              "Forsa, ağır koşullar altında insan onurunu ve direncini anlatan dramatik bir metindir. Kişi kadrosu ve çatışma unsurları metni anlamak için kilit noktalardır. Metinde kullanılan deyim ve atasözlerine dikkat etmek gerekir.",
          },
          {
            id: "turkce-1-3",
            title: "Türkçenin Söz Denizinde – Sevmek",
            explanation:
              "Bu metin, 'sevmek' kavramını dilin zenginliği üzerinden ele alır; sözcüklerin çağrışım ve mecaz anlamları üzerinde durulur. Türkçenin anlam bilgisi açısından önemli bir tema sunmaktadır. Eş anlamlı, zıt anlamlı ve çok anlamlı sözcükler çalışmak için iyi bir metindir.",
          },
          {
            id: "turkce-1-4",
            title: "Dinleme: Dostluğun Değeri",
            explanation:
              "Dinleme metninde dostluğun insan yaşamındaki yeri ve değeri konuşma diliyle aktarılır. Dinleme sorularında ana düşünce, yardımcı düşünce ve ayrıntı soruları ön plana çıkar. Metni dinlerken anahtar sözcüklere odaklanmak doğru yanıt bulmayı kolaylaştırır.",
          },
          {
            id: "turkce-1-5",
            title: "Serbest Okuma: Anadolu'da Tuzun da Bir Sözü Var",
            explanation:
              "Anadolu'nun kültürel dokusunu yansıtan bu metin, semboller ve kültürel ögeler açısından zengindir. Metnin ana düşüncesi sormak istediği temel soruyu ortaya koymak için ana fikir tespiti önemlidir. Kültür ve gelenek kavramlarını çevreleyen sözcükler üzerinde çalışılmalıdır.",
          },
        ],
      },
      {
        id: "turkce-2",
        title: "2. Tema: Doğa ve Evren",
        questions: [
          "\"Kızıl Renkli Komşumuz\" metninde Mars gezegeni nasıl kişileştirilmiştir?",
          "Sonbaharı anlatan bir şiirde kullanılabilecek iki edebi sanatı örnekle açıkla.",
          "Betimleyici metinlerde hangi tür sıfatlar ön plana çıkar?",
          "Bilim kurgu metni ile gerçek bilgi metni arasındaki farkı açıkla.",
          "\"Beyaz Diş\" romanından alınan bölümde anlatıcının bakış açısı nasıldır?",
          "Nesli tükenen canlıları konu alan bir metinde yazarın amacı ne olabilir?",
          "Kişileştirme (teşhis) sanatını örnekle tanımla.",
          "\"Son Kuşlar\" dinleme metninin konusu ve ana düşüncesi nedir?",
          "Doğa betimlemelerinde sıkça kullanılan duyusal ifadeler hangileridir?",
          "Bir metinde neden-sonuç ilişkisi nasıl kurulur? Örnek ver.",
        ],
        topics: [
          {
            id: "turkce-2-1",
            title: "Kızıl Renkli Komşumuz",
            explanation:
              "Bu metin Mars gezegenini kişileştirerek anlatır; bilim ile edebiyatın kesiştiği bir metin türüdür. Kişileştirme ve benzetme gibi edebi sanatlar sık sorgulanır. Bilgi türündeki metinlerde kaynak güvenilirliği ve gerçek-kurgu ayrımı da test edilir.",
          },
          {
            id: "turkce-2-2",
            title: "Ağaçlar Al Giydi Kuşlar Dillendi",
            explanation:
              "Sonbahar temasını işleyen bu şiirde doğa betimlemesi ve lirik anlatım ön plandadır. Şiirde ritim, uyak ve imgeler incelenerek duygu aktarımı değerlendirilir. Şiir sorularında söz sanatlarını ve duygu yoğunluğunu doğru belirlemek başarıyı artırır.",
          },
          {
            id: "turkce-2-3",
            title: "Beyaz Diş",
            explanation:
              "Jack London'ın bu romanından alınan bölüm, vahşi doğayı ve hayatta kalma güdüsünü aktarır. Anlatıcının bakış açısı ve kurgunun yapısı LGS'de sıkça sorulan konular arasındadır. Metnin olay örgüsünü sıralayabilmek ve zaman-mekan ilişkilerini kavramak gerekir.",
          },
          {
            id: "turkce-2-4",
            title: "Dinleme: Son Kuşlar",
            explanation:
              "Nesli tükenen kuşları konu alan bu dinleme metninde çevre bilinci mesajı verilir. Dinleme sorularında metnin ana düşüncesi ve yazarın amacı en çok test edilen noktalardır. Metindeki sıralama ve neden-sonuç ilişkileri iyi anlaşılmalıdır.",
          },
          {
            id: "turkce-2-5",
            title: "Serbest Okuma: Kestane",
            explanation:
              "Kestane üzerine kurulu bu metin, gözlem ve betimleme yazısının özelliklerini taşır. Betimleyici metinlerde niteleyici sıfatlar ve duyuya dayalı ifadeler öne çıkar. Metinde geçen özgün sözcük ve deyimleri anlamak LGS paragraf sorularında avantaj sağlar.",
          },
        ],
      },
      {
        id: "turkce-3",
        title: "3. Tema: Millî Kültürümüz",
        questions: [
          "Ergenekon Destanı'nın temel mesajı nedir?",
          "\"Türkiyem\" şiirinde hangi edebi sanatlar kullanılmıştır?",
          "Nasrettin Hoca fıkralarının en belirgin özelliği nedir?",
          "Atasözü ile deyim arasındaki farkı örnekle açıkla.",
          "\"Türk Plastik Sanatları\" metni hangi metin türündedir? Nasıl anlaşılır?",
          "Sözlü edebiyat ile yazılı edebiyat arasındaki fark nedir?",
          "Destanlarda olağanüstü unsurlar neden yer alır?",
          "Bir atasözü seç ve günlük hayattan buna uygun bir örnek ver.",
          "Anadolu el sanatlarından üç örnek ver ve kültürel önemlerini açıkla.",
          "Millî kimlik oluşturmada dil ve edebiyatın rolü nedir?",
        ],
        topics: [
          {
            id: "turkce-3-1",
            title: "Türk Plastik Sanatları",
            explanation:
              "Türk sanatının temel dallarını tanıtan bu metin, bilgi metni türünde yazılmıştır. Bilgi metinlerinde tanım, sıralama ve örneklendirme yapı taşlarını kavramak gerekir. Sözcük türleri ve cümle bilgisi soruları bu tür metinlerden sıkça sorulur.",
          },
          {
            id: "turkce-3-2",
            title: "Türkiyem",
            explanation:
              "Vatan sevgisini coşkulu bir dille ifade eden bu şiirde lirik anlatım ve yüksek duygu yoğunluğu hâkimdir. Şiirde kullanılan sesleniş ve tekrar gibi söz sanatları tespit edilmelidir. Ritim ve uyak düzenini bulmak şiir sorularındaki puanı artırır.",
          },
          {
            id: "turkce-3-3",
            title: "Ergenekon Destanı",
            explanation:
              "Türk milletinin doğuşunu ve mücadelesini anlatan bu destan, sözlü edebiyatın en güçlü örneklerindendir. Destanın olağanüstü unsurları ve ulusal kimlik mesajı sorgu konusu olur. Mitolojik unsurları gerçek tarihsel olaylardan ayırt edebilmek önemlidir.",
          },
          {
            id: "turkce-3-4",
            title: "Dinleme: Atasözleri Üzerine",
            explanation:
              "Atasözlerinin toplumdaki işlevi ve anlamını ele alan bu dinleme metninde kültürel bilgi ön plandadır. Atasözlerinin gerçek ve mecaz anlamları LGS'de sıkça sorulur. Metni dinlerken numaralı noktaları not etmek sorulara hızlı ulaşmayı sağlar.",
          },
          {
            id: "turkce-3-5",
            title: "Serbest Okuma: Güldüren Gerçek — Nasrettin Hoca",
            explanation:
              "Nasrettin Hoca fıkraları, mizahi bir dille evrensel gerçekler anlatan kısa anlatı türündedir. Fıkralarda güldürü unsuru ile öğüt verilmesi LGS'de anlam bilgisi soruları için kaynaklık eder. Fıkraların ana düşüncesini ve mesajını birkaç cümleyle özetleyebilmek gerekir.",
          },
        ],
      },
      {
        id: "turkce-4",
        title: "4. Tema: Millî Mücadele ve Atatürk",
        questions: [
          "\"Şu Sonsuz Koşu\" şiirinde \"koşu\" metaforu neyi temsil etmektedir?",
          "İstiklâl Marşı'nın yazarı kimdir ve hangi koşullarda yazılmıştır?",
          "Açıklayıcı metin ile betimleyici metin arasındaki fark nedir?",
          "\"Mustafa Kemal'in Kağnısı\" metninde kağnı imgesi neyi simgelemektedir?",
          "Atatürk'ün eğitim alanındaki en önemli reformu hangisidir?",
          "Millî Mücadele'yi konu alan metinlerde sıkça işlenen değerler nelerdir?",
          "Şiirde ritim ve uyak nedir? Birer örnekle açıkla.",
          "\"Duatepe\" metninde anlatıcının duygu durumunu nasıl tanımlarsın?",
          "Coşku ve kararlılık duygularını anlatan metinlerde hangi anlatım biçimleri tercih edilir?",
          "Halkın Millî Mücadele'ye katkısını anlatan bir cümle yaz.",
        ],
        topics: [
          {
            id: "turkce-4-1",
            title: "Duatepe",
            explanation:
              "Kurtuluş Savaşı'nın kritik bir anını betimleyen bu metin, vatanseverlik ve fedakârlık temalarını işler. Metindeki coşku ve kararlılık gibi duygu tonu belirlenebilmelidir. Anlatıcı bakış açısı ve zaman düzlemi soruları dikkatle yanıtlanmalıdır.",
          },
          {
            id: "turkce-4-2",
            title: "Şu Sonsuz Koşu",
            explanation:
              "Millî Mücadele'yi koşu metaforu üzerinden anlatan bu şiirde hareket ve özgürlük duygusu ön plandadır. Şiirde edebi sanatlar; özellikle benzetme ve kişileştirme bulmak gerekir. Şiirin söylemine hâkim olmak anlam soruları için kritik öneme sahiptir.",
          },
          {
            id: "turkce-4-3",
            title: "Atatürk ve Millî Eğitim",
            explanation:
              "Atatürk'ün eğitim reformlarını ele alan bu metin, açıklayıcı metin türünün özelliklerini taşır. Açıklayıcı metinlerde bilginin nasıl verildiği (sıralama, karşılaştırma, örnekleme) sorulur. Metnin bütünüyle tutarlı olan ana düşünceyi belirleyebilmek önemlidir.",
          },
          {
            id: "turkce-4-4",
            title: "Dinleme: Türk İstiklâl Marşı",
            explanation:
              "İstiklâl Marşı'nı ve yazılış sürecini anlatan bu dinleme metninde tarihî ve kültürel bağlam çok önemlidir. Sözcüklerin tarihî anlamları ve metinde verilen bilgilerin doğruluğu test edilebilir. Metnin ana fikrini ve ayrıntı bilgilerini birbirinden ayırt etmek başarıyı artırır.",
          },
          {
            id: "turkce-4-5",
            title: "Serbest Okuma: Mustafa Kemal'in Kağnısı",
            explanation:
              "Halkın Millî Mücadele'ye desteğini sembolik bir kağnı imgesiyle anlatan bu metin, duygusal açıdan güçlüdür. Metindeki sembolizm ve toplumsal mesaj LGS sorularında işlenir. Anlatıcının tutumunu ve okuyucuya verilen duygu yükünü doğru belirlemek gerekir.",
          },
        ],
      },
      {
        id: "turkce-5",
        title: "5. Tema: Vatandaşlık",
        questions: [
          "\"Bebeklerin Ulusu Yok\" metninin türü nedir ve amacı nedir?",
          "İkna edici metinde yazar görüşünü nasıl destekler?",
          "\"Kurtla Köpek\" masalında kurt ve köpek neyi sembolize eder?",
          "Bireysel sorumluluk ile toplumsal sorumluluk arasındaki fark nedir?",
          "Tartışmacı metinde karşı görüşe atıf yapmanın amacı nedir?",
          "Evrensel insan hakları nelerdir? Üç örnek ver.",
          "\"Selim'i Anarım\" metninde anlatıcının bakış açısı nasıldır?",
          "\"Çömlekçi Baba\" hikâyesinde emeğin değeri nasıl işlenmiştir?",
          "Öznel yargı ile nesnel yargı arasındaki farkı örnekle açıkla.",
          "Bir vatandaşın temel hak ve ödevlerinden ikişer örnek ver.",
        ],
        topics: [
          {
            id: "turkce-5-1",
            title: "Selim'i Anarım",
            explanation:
              "Bir dost acısıyla başlayan bu metin, bireysel sorumluluk ve toplumsal bağ temalarını işler. Anlatıcı kimliği ve bakış açısı bu metinde merkezi öneme sahiptir. Metinden çıkarım yapma ve yazarın amacını tespit etme soruları sıkça çıkar.",
          },
          {
            id: "turkce-5-2",
            title: "Bebeklerin Ulusu Yok",
            explanation:
              "Evrensel insan haklarını ve eşitliği savunan bu metin, tartışmacı/düşündürücü metin türündedir. Yazarın görüşü ve destekleyici argümanlar analiz edilmelidir. İkna edici metinlerde kullanılan kanıt, otorite ve duygusal çekicilik unsurlarını ayırt etmek önemlidir.",
          },
          {
            id: "turkce-5-3",
            title: "Birey-Toplumsallık",
            explanation:
              "Bireyin topluma karşı sorumlulukları ve iki kavramın ilişkisini inceleyen bu metin, fikir yazısı niteliğindedir. Ana düşünce ve yardımcı düşünceler arasındaki hiyerarşi soru konusu olur. Paragraftaki neden-sonuç ilişkilerini bulmak LGS paragraf sorularında kritiktir.",
          },
          {
            id: "turkce-5-4",
            title: "Dinleme: Kurtla Köpek",
            explanation:
              "Özgürlük ve güvenlik ikilemi üzerine kurgulanan bu masalda kurtla köpek sembolik kişiliklerdir. Masalın öğretisi ve kişilerin özellikleri LGS'de sorgulanır. Sembolik anlamı gerçek anlamla karıştırmamak doğru yanıt için şarttır.",
          },
          {
            id: "turkce-5-5",
            title: "Serbest Okuma: Çömlekçi Baba",
            explanation:
              "Çömlekçi babayı anlatan bu hikâyede emeğin değeri ve mesleki onur temaları işlenir. Metnin yapısını (serim-düğüm-çözüm) tanımak sorulara sistematik yaklaşmayı sağlar. Sözcük seçiminin anlatıma kattığı etki bu metinde dikkat edilmesi gereken önemli noktadır.",
          },
        ],
      },
      {
        id: "turkce-6",
        title: "6. Tema: Sağlık ve Spor",
        questions: [
          "\"Kahvaltının Önemi\" metninin türü hangisidir? Nasıl anlaşılır?",
          "Nesnel anlatım ile öznel anlatım arasındaki farkı örnekle açıkla.",
          "Bilgi metinlerinde neden-sonuç ilişkisi nasıl kurulur?",
          "\"Güreş\" metninde Türk güreşine ilişkin hangi tarihsel bilgiler verilmektedir?",
          "Masal türünün gerçekçi ve olağanüstü özelliklerini karşılaştır.",
          "Obeziteyle mücadelede metinde önerilen altı yoldan ikisini yaz.",
          "Sağlık metinlerinde istatistik verilerinin kullanılma amacı nedir?",
          "\"Hastahane\" metninde anlatıcı taraflı mı tarafsız mı? Nasıl anlarsın?",
          "Bağlamdan yola çıkarak bir sözcüğün anlamını tespit etmek neden önemlidir?",
          "Spor ile sağlık arasındaki ilişkiyi iki cümleyle açıkla.",
        ],
        topics: [
          {
            id: "turkce-6-1",
            title: "Kahvaltının Önemi",
            explanation:
              "Kahvaltının bedensel ve zihinsel sağlığa etkilerini ele alan bu bilgi metninde neden-sonuç ilişkileri çok net verilir. Bilgi metinlerinde öğütleme ve belgeleme teknikleri analiz edilir. Kullanılan sözcüklerin bilimsel mi yoksa duygusal mı olduğunu belirlemek gerekir.",
          },
          {
            id: "turkce-6-2",
            title: "Güreş",
            explanation:
              "Türk güreşinin tarihini ve kültürel önemini anlatan bu metinde ulusal kimlik vurgusu güçlüdür. Metindeki bilgileri kronolojik sıraya dizebilmek önemli bir okuma becerisidir. Sözcük türleri, özellikle sıfat ve fiillerin metne katkısı sorulabilir.",
          },
          {
            id: "turkce-6-3",
            title: "Lokman Hekim'in Masalı",
            explanation:
              "Halk masalı geleneğini sürdüren bu metinde sağlık ve bilgelik temaları öne çıkar. Masalın olağanüstü unsurları ve gerçekçi unsurları arasında ayrım yapabilmek gerekir. Masalın verdiği mesajı günlük yaşama aktarabilmek anlam sorularında avantaj sağlar.",
          },
          {
            id: "turkce-6-4",
            title: "Dinleme: Obezite ile Mücadelenin Altı Yolu",
            explanation:
              "Sağlıklı yaşam önerilerini sıralayan bu dinleme metninde veriler ve istatistikler ön plandadır. Numaralı önerileri sırayla eşleştirebilmek dinleme sorularında başarı getirir. Genel ve özel bilgileri birbirinden ayırt etmek metnin bütününü kavramayı kolaylaştırır.",
          },
          {
            id: "turkce-6-5",
            title: "Serbest Okuma: Hastahane",
            explanation:
              "Hastane ortamını gerçekçi ve duygusal bir dille aktaran bu metinde gözlem ve betimleme güçlüdür. Anlatıcının taraflı veya tarafsız tutumunu belirlemek yorum sorularında kritiktir. Metnin bağlamına uygun kelime anlamlarını bulmak anlam bilgisi için önemlidir.",
          },
        ],
      },
      {
        id: "turkce-7",
        title: "7. Tema: Sanat",
        questions: [
          "\"Ressam İçin Zili Çalın\" metninin teması nedir?",
          "Gezi yazısında anlatıcı hangi rolü üstlenir?",
          "Ziya Gökalp'in \"San'at\" şiirinde sanat ile millet kavramları nasıl ilişkilendirilmiştir?",
          "Dolaylı anlatım ile açık anlatım arasındaki fark nedir?",
          "Lirik şiir ile epik şiir arasındaki fark nedir?",
          "Bir sanatçının hayatını anlatan metin hangi türdür?",
          "İkna edici bir metinde kullanılan üç ikna yöntemi nedir?",
          "Anadolu el sanatlarından bir örnek seç ve kültürel önemini açıkla.",
          "\"Bir Kış Öyküsü\"nde kış imgesi hangi duygusal anlamı taşımaktadır?",
          "Sanat eserinin topluma katkısını üç cümleyle açıkla.",
        ],
        topics: [
          {
            id: "turkce-7-1",
            title: "Ressam İçin Zili Çalın",
            explanation:
              "Bir ressamın sanatına adanmışlığını anlatan bu metinde sanat ve emek temaları işlenir. Metindeki ima ve dolaylı anlatım unsurlarını kavramak yorum sorularında belirleyicidir. Yazarın sanatçıya bakış açısını belirleyebilmek okuma becerisini geliştirir.",
          },
          {
            id: "turkce-7-2",
            title: "Geleneksel El Sanatları Çarşısı",
            explanation:
              "Anadolu el sanatlarını tanıtan bu gezi yazısında betimleme ve bilgi verme bir arada kullanılır. Gezi yazısının özellikleri ve anlatıcının gözlemci rolü sorgulanır. Sözcüklerin bağlamdan çıkarılabilecek anlamları bu tür metinlerde sık test edilir.",
          },
          {
            id: "turkce-7-3",
            title: "San'at",
            explanation:
              "Ziya Gökalp'in sanat anlayışını yansıtan bu şiirde vatan, millet ve sanat kavramları iç içedir. Şiirdeki düşünce akışını ve ana mesajı tespit etmek gerekir. Şiirde kullanılan devrik cümle ve soru yapılarının anlatıma katkısı sorulabilir.",
          },
          {
            id: "turkce-7-4",
            title: "Dinleme: Armağan",
            explanation:
              "Sanatın topluma armağan olduğunu savunan bu dinleme metni, ikna edici bir üslupla yazılmıştır. Konuşmacının amacı ve kullandığı ikna teknikleri dinleme sorularının konusudur. Metnin genel mesajına uygun seçenekler arasından doğru olanı seçmek önemlidir.",
          },
          {
            id: "turkce-7-5",
            title: "Serbest Okuma: Bir Kış Öyküsü",
            explanation:
              "Kış mevsimini arka plan olarak kullanan bu kısa hikâyede insan ilişkileri ve sıcaklık temaları işlenir. Kısa hikâyenin temel bileşenlerini (olay, kişi, yer, zaman) doğru tespit etmek gerekir. Metindeki kış imgesinin sembolik anlamını düşünmek yorum sorularında avantaj sağlar.",
          },
        ],
      },
      {
        id: "turkce-8",
        title: "8. Tema: Bilim ve Teknoloji",
        questions: [
          "\"Robotlar\" metninde nesnel anlatımı gösteren iki özelliği yaz.",
          "Bilimsel düşüncenin temel özellikleri nelerdir?",
          "Harezmî'nin algoritmayı bulmasının tarihe katkısı nedir?",
          "\"Pastör'ün Savaşı\" metninde biyografi ve bilgi metni özellikleri nasıl iç içedir?",
          "Sosyal medya bağımlılığı metninde yazarın görüşü nedir?",
          "Kanıta dayalı metin ile kişisel gözleme dayalı metin arasındaki fark nedir?",
          "Bilimsel terimlerin metin içindeki anlamı ile sözlük anlamı farklı olabilir mi? Örnek ver.",
          "Teknolojinin insan ilişkilerine olumlu ve olumsuz etkilerini karşılaştır.",
          "\"Akıl Aydınlığında\" metninin ana düşüncesi bir cümleyle nedir?",
          "Paragrafta ana fikir ile yardımcı fikirler nasıl ayrıştırılır?",
        ],
        topics: [
          {
            id: "turkce-8-1",
            title: "Robotlar",
            explanation:
              "Robotların günlük hayattaki ve endüstrideki yerini ele alan bu metin, nesnel bir bilgi metnidir. Bilimsel terimlerin metin içi anlamlarını kavramak sözcük bilgisi soruları için önemlidir. Yazarın tutumu (yansız/taraflı) ve bilginin geçerliliği sorgulanabilir.",
          },
          {
            id: "turkce-8-2",
            title: "Akıl Aydınlığında",
            explanation:
              "Bilimsel düşüncenin önemini savunan bu metin, kanıta dayalı argümanlarla güçlendirilmiştir. Metnin yapısını (giriş-gelişme-sonuç) tanımak paragraf sorularını çözmeyi kolaylaştırır. Neden-sonuç ilişkilerini ve örnekleri ana fikirden ayırt etmek başarı getirir.",
          },
          {
            id: "turkce-8-3",
            title: "Pastör'ün Savaşı",
            explanation:
              "Pasteur'ün aşı araştırmaları üzerinden bilimsel metodu anlatan bu metin hem biyografi hem de bilgi metni özelliği taşır. Kronolojik sıralama ve neden-sonuç zinciri bu metinde belirleyicidir. Bilimsel kelimelerin sözlük ve bağlam anlamları LGS'de sıkça sorulur.",
          },
          {
            id: "turkce-8-4",
            title: "Dinleme: Harezmî",
            explanation:
              "Matematikçi Harezmî'nin algoritmayı buluşunu anlatan bu dinleme metninde icatlar ve bilimsel süreç aktarılır. Bilim insanının özelliklerini ve bilginin tarihini doğru sıralamak başarı sağlar. Dinleme metninde verilmeyen bilgileri seçeneklerde fark etmek yanılma riskini azaltır.",
          },
          {
            id: "turkce-8-5",
            title: "Serbest Okuma: Sosyal Medya Bağımlılığı",
            explanation:
              "Sosyal medyanın olumsuz etkilerini tartışan bu metin, ikna edici metin türüne girer. Yazarın savunduğu görüş ve karşıt görüşe yapılan atıflar analiz edilmelidir. Metnin okuyucu üzerindeki hedeflenen etkiyi belirleme LGS'de bir okuma becerisi olarak ölçülür.",
          },
        ],
      },
    ],
  },
  {
    id: "cahit_arf",
    name: "Matematik",
    emoji: "🧮",
    color: "#5E8BC3",
    bg: "bg-sky-100",
    units: [
      {
        id: "mat-1",
        title: "1. Ünite: Çarpanlar, Katlar ve Üslü İfadeler",
        questions: [
          "24 sayısının tüm bölenlerini yaz.",
          "48 ve 72'nin EBOB'unu asal çarpanlara ayırarak bul.",
          "4 ve 6'nın EKOK'unu bul.",
          "2³ × 2⁴ işleminin sonucu kaçtır?",
          "(3²)³ işleminin sonucu kaçtır?",
          "3⁶ ÷ 3² işleminin sonucu kaçtır?",
          "2⁻³ değeri kaçtır? (Kesir olarak yaz.)",
          "0,000072 sayısını bilimsel gösterimle yaz.",
          "3,6 × 10⁴ sayısının normal yazılışı nedir?",
          "Aralarında asal iki sayının EBOB'u kaçtır?",
          "5⁰ + 5¹ değeri kaçtır?",
          "(-2)⁴ işleminin sonucu pozitif mi negatif mi? Neden?",
        ],
        topics: [
          {
            id: "mat-1-1",
            title: "Çarpanlara Ayırma ve EBOB/EKOK",
            explanation:
              "Bir tam sayının tüm çarpanlarını bulmak, o sayıyı asal çarpanların çarpımı şeklinde yazmakla başlar. En Büyük Ortak Bölen (EBOB) iki ya da daha fazla sayının ortak çarpanlarının en büyüğüdür; En Küçük Ortak Kat (EKOK) ise ortak katların en küçüğüdür. Bu kavramlar kesirleri sadeleştirmek ve toplama yapmak için temel oluşturur.",
          },
          {
            id: "mat-1-2",
            title: "Aralarında Asal Sayılar",
            explanation:
              "İki sayının EBOB'u 1 ise bu sayılar aralarında asaldır; bu durum ortak çarpan taşımadıklarını gösterir. Aralarında asal sayılarla çalışmak kesir işlemlerini ve oran-orantı problemlerini kolaylaştırır. LGS sorularında genellikle EBOB = 1 koşulundan bilinmeyen bulma biçiminde sorulur.",
          },
          {
            id: "mat-1-3",
            title: "Üslü İfadeler",
            explanation:
              `Üslü ifade: **taban** kaç kez çarpılacak, **üs** bunu söyler. $a^n$ demek $n$ tane $a$'nın çarpımıdır.

**Örnek:** $3^4 = 3 \\times 3 \\times 3 \\times 3 = 81$

### Temel Kurallar

| Kural | Formül | Örnek |
|---|---|---|
| Çarpma | $a^m \\cdot a^n = a^{m+n}$ | $2^3 \\cdot 2^5 = 2^8$ |
| Bölme | $a^m \\div a^n = a^{m-n}$ | $2^8 \\div 2^3 = 2^5$ |
| Üs üsse | $(a^m)^n = a^{m \\cdot n}$ | $(2^3)^4 = 2^{12}$ |
| Sıfır üs | $a^0 = 1$ | $7^0 = 1$ |
| Negatif üs | $a^{-n} = \\dfrac{1}{a^n}$ | $2^{-3} = \\dfrac{1}{8}$ |

**Negatif taban:** çift üs → pozitif, tek üs → negatif.
$(-2)^2 = +4$ &nbsp; $(-2)^3 = -8$`,
            sampleQs: [
              "2³ × 2⁴ işleminin sonucu kaçtır?",
              "(3²)³ işleminin sonucu kaçtır?",
              "5⁰ + 5¹ değeri kaçtır?",
              "3⁶ ÷ 3² işleminin sonucu kaçtır?",
              "2⁻³ değeri kaçtır? (Kesir olarak yaz.)",
              "(−2)⁴ işleminin sonucu pozitif mi negatif mi? Neden?",
              "4⁰ × 4³ × 4⁻² işleminin sonucu kaçtır?",
              "a² × a³ × a⁻¹ ifadesini tek üslü olarak yaz.",
              "Bir sayının 0. kuvvetinin her zaman 1 olması için ne şartı gereklidir?",
              "2¹⁰ kaç eder? (En az 3 farklı yoldan hesapla.)",
            ],
          },
          {
            id: "mat-1-4",
            title: "Bilimsel Gösterim",
            explanation:
              `Çok büyük/küçük sayıları $a \\times 10^n$ biçiminde yazarız; burada $1 \\le a < 10$.

**Büyük sayı → sağa kaydır:** $4\\,500\\,000 = 4{,}5 \\times 10^6$ *(virgül 6 basamak sola gitti)*

**Küçük sayı → sola kaydır:** $0{,}000045 = 4{,}5 \\times 10^{-5}$ *(virgül 5 basamak sağa gitti)*

### İpucu
- Üs **pozitif** → sayı 1'den **büyük**
- Üs **negatif** → sayı 1'den **küçük**
- Bilimsel gösterimdeki sayıları çarpmak: üsleri topla, $a$ kısmını ayrıca çarp.`,
            sampleQs: [
              "0,00072 sayısını bilimsel gösterimle yaz.",
              "3,6 × 10⁴ sayısının normal yazılışı nedir?",
              "4 × 10³ + 6 × 10² toplamı kaçtır?",
              "Güneş ile Dünya arasındaki mesafe yaklaşık 1,5 × 10⁸ km'dir. Bu kaç km eder?",
              "2,5 × 10³ ile 4 × 10² çarpımı bilimsel gösterimle kaçtır?",
              "0,000 000 45 sayısını bilimsel gösterimle yaz.",
              "6 × 10⁻⁴ sayısının normal yazılışı nedir?",
            ],
          },
          {
            id: "mat-1-5",
            title: "Ondalık Gösterimleri Çözümleme",
            explanation:
              "Ondalık sayılar, birim, onda bir, yüzde bir gibi basamak değerleri toplamı olarak çözümlenerek yüzlük, binde bir gibi kesirlere dönüştürülebilir. Bu çözümleme, işlem sırasını ve ondalık basamaklardaki hataları bulmak için güçlü bir araçtır. Özellikle kareköklü ifadelerin ondalık yaklaşımlarında bu beceri hayat kurtarır.",
          },
        ],
      },
      {
        id: "mat-2",
        title: "2. Ünite: Kareköklü İfadeler ve Veri Analizi",
        questions: [
          "√144 kaçtır?",
          "√50 hangi iki ardışık tam sayı arasındadır?",
          "√75 ifadesini en basit biçimde yaz.",
          "√3 · √12 çarpımı kaçtır?",
          "3√5 + 2√5 toplamı kaçtır?",
          "√18 − √8 farkı kaçtır?",
          "5 öğrencinin notu: 70, 85, 90, 75, 80. Ortalaması kaçtır?",
          "Aynı verilerin ortancası (medyan) kaçtır?",
          "Çizgi grafiğinde yatay eksen zamanı gösteriyorsa ne anlam taşır?",
          "√12 + √27 toplamı kaçtır?",
          "Alanı 50 cm² olan karenin bir kenarı yaklaşık kaç cm'dir?",
        ],
        topics: [
          {
            id: "mat-2-1",
            title: "Tam Kare Sayılar ve Karekök",
            explanation:
              `$\\sqrt{a}$ demek "karesini alınca $a$ veren sayı" demektir. $n^2 = a$ ise $\\sqrt{a} = n$.

**Önemli tam kareler:**

$$1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144 \\ldots$$

**Tam kare olmayan sayılar için aralık:**

$\\sqrt{50}$ → $7^2=49$ ve $8^2=64$ olduğundan $7 < \\sqrt{50} < 8$

**LGS ipucu:** $\\sqrt{50} = \\sqrt{25 \\cdot 2} = 5\\sqrt{2}$ şeklinde sadeleştirebilirsin.`,
            sampleQs: [
              "√144 kaçtır?",
              "√50 hangi iki ardışık tam sayı arasındadır?",
              "√75 ifadesini kök dışına çıkararak en basit biçimde yaz.",
              "√200 = kaç√2'dir?",
              "√(9/16) kaçtır?",
              "Alanı 48 cm² olan kare bahçenin bir kenarı kaç cm'dir? (Tam sayı olmayabilir.)",
              "√3 ile √4 arasında kaç tam sayı vardır?",
            ],
          },
          {
            id: "mat-2-2",
            title: "Kareköklü İfadelerde İşlemler",
            explanation:
              `### Çarpma ve Bölme
$$\\sqrt{a} \\cdot \\sqrt{b} = \\sqrt{a \\cdot b} \\qquad \\dfrac{\\sqrt{a}}{\\sqrt{b}} = \\sqrt{\\dfrac{a}{b}}$$

**Örnek:** $\\sqrt{3} \\cdot \\sqrt{12} = \\sqrt{36} = 6$

### Toplama ve Çıkarma
Kök içleri **aynıysa** katsayılar toplanır:
$$3\\sqrt{5} + 2\\sqrt{5} = 5\\sqrt{5}$$
Farklı kök içleri **birleştirilemez:** $\\sqrt{3} + \\sqrt{5} \\ne \\sqrt{8}$ ⚠️

### Katsayıyı İçeri/Dışarı Alma
$$5\\sqrt{2} = \\sqrt{25 \\cdot 2} = \\sqrt{50} \\qquad \\sqrt{75} = \\sqrt{25 \\cdot 3} = 5\\sqrt{3}$$`,
            sampleQs: [
              "√3 · √12 çarpımı kaçtır?",
              "3√5 + 2√5 toplamı kaçtır?",
              "√18 − √8 farkı kaçtır? (İpucu: önce sadeleştir.)",
              "5√2 ifadesini tek kök altında yaz.",
              "√3 + √5 = √8 midir? Doğru mu yanlış mı? Açıkla.",
              "2√3 · 3√3 çarpımı kaçtır?",
              "(√5 + √2)(√5 − √2) çarpımı kaçtır?",
              "√12 + √27 toplamı kaçtır?",
              "√72 / √2 bölümü kaçtır?",
            ],
          },
          {
            id: "mat-2-3",
            title: "Gerçek Sayılar",
            explanation:
              "Gerçek sayılar; doğal, tam, rasyonel ve irrasyonel sayıların tümünü kapsar ve sayı doğrusu üzerinde her noktayı temsil eder. Rasyonel sayılar kesir ya da sonlu/periyodik ondalık biçiminde gösterilebilirken, irrasyonel sayılar gösterilemez. Bu kümelerin hiyerarşisini bilmek 'hangi kümeye aittir?' sorularını kolaylaştırır.",
          },
          {
            id: "mat-2-4",
            title: "Çizgi ve Sütun Grafikleri",
            explanation:
              "Çizgi grafikleri zamanla değişen verileri göstermek için kullanılırken sütun grafikleri kategorik karşılaştırmalar için daha uygundur. Grafik okumada eksen başlıkları, birimler ve ölçek aralıklarına dikkat etmek yorum hatalarını önler. LGS'de aynı verinin farklı grafik türlerinde gösterildiği sorular çıkabilir.",
          },
          {
            id: "mat-2-5",
            title: "Verilerin Farklı Gösterimleri",
            explanation:
              "Aynı veri seti tablo, sütun grafiği, daire grafiği veya stem-and-leaf düzeni ile gösterilebilir; her gösterim farklı bilgileri öne çıkarır. Ortalama, ortanca ve tepe değeri (mod) bu verileri özetleyen istatistik ölçüleridir. Hangi ölçünün veriyi daha iyi temsil ettiğini belirlemek yorumlama sorularının özüdür.",
          },
        ],
      },
      {
        id: "mat-3",
        title: "3. Ünite: Olasılık ve Cebirsel Özdeşlikler",
        questions: [
          "Torbada 3 kırmızı, 7 mavi top var. Mavi çekme olasılığı nedir?",
          "Bir zarı atıldığında 5'ten büyük gelme olasılığı nedir?",
          "10 bilettan 2'si kazanan; bir bilet alan kazanma olasılığı nedir?",
          "(x + 5)² açılımı nedir?",
          "(2a − 3b)² ifadesini genişlet.",
          "(x + 4)(x − 4) çarpımı nedir?",
          "x² − 25 ifadesini çarpanlarına ayır.",
          "101² değerini özdeşlik kullanarak hesapla.",
          "99 × 101 çarpımını özdeşlik kullanarak hesapla.",
          "x + 1/x = 5 ise x² + 1/x² değeri kaçtır?",
          "x² + 10x + 25 ifadesini tam kare olarak yaz.",
        ],
        topics: [
          {
            id: "mat-3-1",
            title: "Basit Olayların Olasılığı",
            explanation:
              `$$P(A) = \\dfrac{\\text{A'nın gerçekleşme sayısı}}{\\text{Toplam eşit olası sonuç sayısı}}$$

**Sınırlar:** $0 \\le P(A) \\le 1$ — imkânsız olay $= 0$, kesin olay $= 1$.

### Örnek — Torbadan Top Çekme
Torbada 3 kırmızı, 4 mavi, 5 yeşil top var (toplam 12).

$$P(\\text{mavi veya yeşil}) = \\dfrac{4+5}{12} = \\dfrac{9}{12} = \\dfrac{3}{4}$$

### LGS İpuçları
- Olasılık hiçbir zaman 1'den büyük olamaz.
- "En az bir" soruları için: $P(\\text{en az 1}) = 1 - P(\\text{hiç çıkmaz})$`,
            sampleQs: [
              "Torbada 3 kırmızı, 7 mavi top var. Rastgele çekilen topun mavi olma olasılığı nedir?",
              "1'den 20'ye kadar tam sayılardan birini rastgele seçiyoruz. Çift sayı seçme olasılığı nedir?",
              "Bir zarı atıyoruz. 5'ten büyük gelme olasılığı nedir?",
              "Bir para atılıyor. Art arda 2 kez yazı gelme olasılığı nedir?",
              "Torbada 5 kırmızı, 3 yeşil, 2 sarı top var. En az 1 kırmızı çekme olasılığı nedir?",
              "Olasılığı 0 olan bir olay için gerçek hayattan örnek ver.",
              "Olasılığı 1 olan bir olay için gerçek hayattan örnek ver.",
              "Bir sınıfta 15 kız ve 10 erkek öğrenci var. Rastgele seçilen bir öğrencinin kız olma olasılığı nedir?",
              "Bir zarı atıldığında 3'ten küçük gelme olasılığı nedir?",
              "10 bilet arasında 2 kazanan bilet var. Bir bilet alırsam kazanma olasılığım nedir?",
            ],
          },
          {
            id: "mat-3-2",
            title: "Cebirsel İfadeler ve Çarpma",
            explanation:
              "Bir tek terimli (monom) ile bir çok terimliyi (polinom) çarparken dağılma özelliği uygulanarak her terim tek terimliye çarpılır. Benzer terimleri toplamayı unutmamak işlemin doğruluğu için kritiktir. Bu beceri denklem çözme ve alan formülü problemlerinde sürekli karşına çıkar.",
          },
          {
            id: "mat-3-3",
            title: "Özdeşlikler",
            explanation:
              `### Üç Temel Özdeşlik

$$\\boxed{(a+b)^2 = a^2 + 2ab + b^2}$$

$$\\boxed{(a-b)^2 = a^2 - 2ab + b^2}$$

$$\\boxed{(a+b)(a-b) = a^2 - b^2}$$

### Hızlı Hesap Örneği
$101^2 = (100+1)^2 = 10000 + 200 + 1 = 10201$ ✓

### Ters Yön — Çarpanlara Ayırma
$$x^2 - 9 = (x+3)(x-3) \\\\ x^2 + 6x + 9 = (x+3)^2$$

**LGS sınavında** özdeşliğin hangi yönde kullanıldığına dikkat et: bazen açmak, bazen çarpmak istenir.`,
            sampleQs: [
              "(x + 5)² açılımı nedir?",
              "(2a − 3b)² ifadesini genişlet.",
              "(x + 4)(x − 4) çarpımı nedir?",
              "x² − 16 ifadesini çarpanlarına ayır.",
              "(a + b)² − (a − b)² ifadesini sadeleştir.",
              "x + (1/x) = 3 ise x² + (1/x²) değeri kaçtır?",
              "101² değerini özdeşlik kullanarak hızlıca hesapla.",
              "99 × 101 çarpımını özdeşlik kullanarak hesapla.",
              "x² + 10x + 25 ifadesini tam kare olarak yaz.",
              "4a² − 9b² ifadesini çarpanlarına ayır.",
            ],
          },
          {
            id: "mat-3-4",
            title: "Çarpanlara Ayırma",
            explanation:
              "Cebirsel ifadeyi çarpanlarına ayırmak, özdeşlikleri ve ortak faktör çıkarmayı tersine uygulamak demektir. Bu beceri denklem çözümlerini bulmayı ve kesirli ifadeleri sadeleştirmeyi kolaylaştırır. LGS'de en çok fark alma özdeşliği ve ortak çarpan çıkarma biçiminde sorulur.",
          },
        ],
      },
      {
        id: "mat-4",
        title: "4. Ünite: Doğrusal Denklemler ve Eşitsizlikler",
        questions: [
          "3x + 7 = 22 denklemini çöz.",
          "x/2 − 3 = 5 denklemini çöz.",
          "y = 2x + 3 doğrusunun eğimi ve y-kesim noktası nedir?",
          "(0, 2) ve (4, 10) noktalarından geçen doğrunun eğimi kaçtır?",
          "2x − 5 > 3 eşitsizliğini çöz.",
          "x + 3 < 2x − 1 eşitsizliğinin çözüm kümesini bul.",
          "y = 3x + 1 ve y = 3x − 4 doğruları birbirini keser mi? Açıkla.",
          "x = 3 olduğunda y = 4x − 2 doğrusunda y değeri kaçtır?",
          "Eğimi negatif olan doğru hangi yönde gider?",
          "Bir öğrenci 5 sınavdan 350 puan almıştır. Ortalaması kaçtır?",
          "Eşitsizliği negatif sayıyla çarparken işaret neden ters çevrilir?",
        ],
        topics: [
          {
            id: "mat-4-1",
            title: "Birinci Dereceden Denklemler",
            explanation:
              "Birinci dereceden bir bilinmeyenli denklemlerde amaç bilinmeyeni eşitliğin bir tarafında yalıtmaktır; bunun için her iki tarafa aynı işlemi uygulamak gerekir. Gerçek hayat problemlerini denklem kurarak çözmek 8. sınıf matematiğinin en önemli becerilerinden biridir. Çözümü kontrol etmek için bulduğun değeri denkleme yerleştirip iki tarafın eşit olup olmadığını test edebilirsin.",
          },
          {
            id: "mat-4-2",
            title: "Koordinat Sistemi ve Doğrusal İlişki",
            explanation:
              "Koordinat düzleminde her nokta (x, y) ikilisi ile belirlenir; doğrusal ilişkide bu noktalar bir doğru üzerindedir. İki değişken arasındaki doğrusal ilişkiyi tablo, grafik ve denklem biçiminde ifade edebilmek çok önemlidir. LGS'de tablodaki değerleri grafik üzerinde yorumlamak sıkça sorulur.",
          },
          {
            id: "mat-4-3",
            title: "Doğrusal Denklemlerin Grafiği ve Eğim",
            explanation:
              `Doğrusal denklemin genel biçimi: $y = mx + b$

| Sembol | Anlamı |
|---|---|
| $m$ | **Eğim** — $x$ 1 birim artarken $y$ kaç birim değişir |
| $b$ | **y-kesim noktası** — doğrunun $y$ eksenini kestiği yer |

$$m = \\dfrac{y_2 - y_1}{x_2 - x_1}$$

**Eğim yorumu:**
- $m > 0$ → doğru **artan** (soldan sağa yukarı gider)
- $m < 0$ → doğru **azalan**
- $m = 0$ → **yatay** doğru

**Örnek:** $y = 2x + 3$ → eğim 2, $y$-kesim 3.
$x=0$'da $y=3$; $x=1$'de $y=5$ (2 birim arttı).`,
            sampleQs: [
              "y = 3x − 5 doğrusunun eğimi ve y-kesim noktası nedir?",
              "(0, 2) ve (3, 8) noktalarından geçen doğrunun eğimi kaçtır?",
              "y = −2x + 4 doğrusu artan mı azalan mı?",
              "Eğimi 0 olan bir doğru nasıl görünür? Örnek denklem yaz.",
              "y = 4x + 1 ve y = 4x − 3 doğruları birbirini keser mi? Neden?",
              "Eğimi 2, y-kesimi 5 olan doğrunun denklemi nedir?",
              "x = 3 noktasında y = 2x + 1 doğrusunun y değeri kaçtır?",
            ],
          },
          {
            id: "mat-4-4",
            title: "Eşitsizlikler",
            explanation:
              "Eşitsizlikler, bir ifadenin belirli bir sınırdan büyük ya da küçük olduğu durumları gösterir ve çözüm kümesi sayı doğrusunda aralık biçiminde ifade edilir. Eşitsizliği negatif bir sayıyla çarparken ya da bölerken eşitsizlik işareti ters çevrilir. Gerçek hayat problemlerinde minimum/maksimum koşulları eşitsizlik kurularak çözülür.",
          },
        ],
      },
      {
        id: "mat-5",
        title: "5. Ünite: Üçgenler",
        questions: [
          "Dik kenarları 6 ve 8 olan dik üçgenin hipotenüsü kaç cm'dir?",
          "Hipotenüsü 13, bir dik kenarı 5 olan üçgenin diğer dik kenarı kaçtır?",
          "Kenar uzunlukları 3, 4, 8 olan bir üçgen çizilebilir mi? Neden?",
          "Bir üçgende açıortay ne işe yarar?",
          "3-4-5 üçlüsünün her elemanını 3 ile çarparak yeni bir Pisagor üçlüsü oluştur.",
          "Bir dikdörtgenin kenarları 5 ve 12 cm ise köşegeni kaç cm'dir?",
          "Kenarı 4√2 cm olan karenin köşegeni kaç cm'dir?",
          "Benzer üçgenlerde açılar ve kenarlar hakkında ne söylenebilir?",
          "Bir üçgende en büyük kenar ile en büyük açı arasındaki ilişki nedir?",
          "Eş üçgenleri benzer üçgenlerden ayıran özellik nedir?",
        ],
        topics: [
          {
            id: "mat-5-1",
            title: "Açıortay, Kenarortay ve Yükseklik",
            explanation:
              "Açıortay, bir üçgende bir iç açıyı iki eşit parçaya bölen doğru parçasıdır; kenarortay ise bir kenarın orta noktasını karşı köşeye bağlar. Yükseklik, bir köşeden karşı kenara dik olarak indirilen doğru parçasıdır. Bu üç özel doğru parçasının kesim noktaları sırasıyla iç teğet çemberi merkezi, ağırlık merkezi ve yükseklik merkezi olarak adlandırılır.",
          },
          {
            id: "mat-5-2",
            title: "Kenar ve Açı İlişkileri",
            explanation:
              "Bir üçgende en büyük kenara karşı en büyük açı, en küçük kenara karşı en küçük açı bulunur; bu ilişki LGS'de kenar ve açıları sıralamayı gerektiren sorular için temeldir. Üçgen eşitsizliğine göre herhangi iki kenar toplamı üçüncü kenardan büyük olmalıdır. Bu kuralla bir üçgen oluşturup oluşturmadığını hızla kontrol edebilirsin.",
          },
          {
            id: "mat-5-3",
            title: "Pisagor Teoremi",
            explanation:
              `Dik üçgende iki dik kenarın kareleri toplamı hipotenüs karesine eşittir:

$$\\boxed{a^2 + b^2 = c^2}$$

*$c$ = hipotenüs (dik açının karşısındaki kenar)*

### Pisagor Üçlüleri (ezbere bil!)

| $a$ | $b$ | $c$ |
|---|---|---|
| 3 | 4 | 5 |
| 5 | 12 | 13 |
| 8 | 15 | 17 |

Bunların katları da geçerlidir: $6, 8, 10$ veya $9, 12, 15$ gibi.

### Uygulamalar
- Dikdörtgenin köşegeni: $d = \\sqrt{a^2 + b^2}$
- Yüksekliği bulmak: $h = \\sqrt{c^2 - a^2}$`,
            sampleQs: [
              "Dik kenarları 6 cm ve 8 cm olan dik üçgenin hipotenüsü kaç cm'dir?",
              "Hipotenüsü 13 cm, bir dik kenarı 5 cm olan üçgenin diğer dik kenarı kaçtır?",
              "10, 24, 26 üçlüsü Pisagor üçlüsü müdür? Kontrol et.",
              "Bir dikdörtgenin kenarları 5 cm ve 12 cm. Köşegeni kaç cm'dir?",
              "Hipotenüsü 17 cm ve bir dik kenarı 8 cm olan dik üçgenin alanı kaç cm²'dir?",
              "Kenarı 4 cm olan karenin köşegeni kaç cm'dir? (√ kullanarak yaz.)",
              "3-4-5 üçlüsünün her elemanını 3 ile çarparak yeni bir Pisagor üçlüsü oluştur.",
              "Dikdörtgen bir bahçenin genişliği 9 m, uzunluğu 12 m. Köşegeni kaç m'dir?",
            ],
          },
          {
            id: "mat-5-4",
            title: "Eşlik ve Benzerlik",
            explanation:
              "Eş üçgenler hem aynı şekle hem aynı boyutlara sahip olup köşe sırasına göre eşleştirilmelidir. Benzer üçgenler aynı açılara ve orantılı kenarlara sahiptir; ölçek faktörü kenarlar arasındaki oranı verir. LGS'de benzerlik oranını kullanarak bilinmeyen kenar uzunluklarını hesaplamak sıkça sorulur.",
          },
        ],
      },
      {
        id: "mat-6",
        title: "6. Ünite: Dönüşüm Geometrisi ve Geometrik Cisimler",
        questions: [
          "Taban kenarı 4 cm, yüksekliği 10 cm olan kare prizmanın hacmi kaçtır?",
          "Yarıçapı 3 cm, yüksekliği 7 cm olan silindirin hacmi kaçtır? (π cinsinden)",
          "Taban kenarı 6 cm, yüksekliği 9 cm olan kare piramidin hacmi kaçtır?",
          "Öteleme ile yansıma arasındaki fark nedir?",
          "Bir şeklin yansımasında kenar uzunlukları korunur mu?",
          "Silindirin yarıçapı 2 katına çıkarsa hacmi kaç katına çıkar?",
          "Koni ve silindir aynı taban ve yüksekliğe sahipse hacim oranları kaçtır?",
          "Taban alanı 25 cm², yüksekliği 6 cm olan prizmanın hacmi kaçtır?",
          "(3, 2) noktasını (5, 0) vektörü ile ötelersek yeni koordinat nedir?",
          "Silindirin yanal yüzeyi açıldığında oluşan şekil hangisidir?",
        ],
        topics: [
          {
            id: "mat-6-1",
            title: "Öteleme ve Yansıma",
            explanation:
              "Ötelemede şekil belirli bir yönde sabit mesafe kadar kaydırılır; tüm noktalar aynı vektörle hareket eder. Yansımada ise şekil bir eksen üzerinde ayna görüntüsü alır; eksene uzaklıklar korunur. Bu dönüşümleri koordinat düzleminde uygulamak yeni noktaların koordinatlarını bulmayı gerektirir.",
          },
          {
            id: "mat-6-2",
            title: "Dik Prizma ve Silindir",
            explanation:
              `### Dik Prizma

$$V_{\\text{prizma}} = A_{\\text{taban}} \\times h$$

$$A_{\\text{yüzey}} = 2 A_{\\text{taban}} + \\text{çevre}_{\\text{taban}} \\times h$$

### Dik Dairesel Silindir *(taban = daire, yarıçap $r$)*

$$V_{\\text{silindir}} = \\pi r^2 h$$

$$A_{\\text{yanal}} = 2\\pi r h \\qquad A_{\\text{toplam}} = 2\\pi r^2 + 2\\pi r h$$

**Açınım ipucu:** Silindirin yanal yüzeyi açılınca dikdörtgen olur; genişliği $2\\pi r$, yüksekliği $h$'dir.`,
            sampleQs: [
              "Taban kenarı 4 cm, yüksekliği 10 cm olan kare prizmanın hacmi kaç cm³'tür?",
              "Yarıçapı 3 cm, yüksekliği 7 cm olan silindirin hacmi kaçtır? (π cinsinden yaz.)",
              "Bir silindirin yarıçapı 2 katına çıkarsa hacmi kaç katına çıkar?",
              "Yanal yüzey alanı 60π cm² ve yüksekliği 5 cm olan silindirin yarıçapı kaçtır?",
              "Taban çevresi 20 cm ve yüksekliği 8 cm olan üçgen prizmanın yanal yüzey alanı kaçtır?",
              "Taban alanı 25 cm², yüksekliği 6 cm olan prizmanın hacmi kaç cm³'tür?",
            ],
          },
          {
            id: "mat-6-3",
            title: "Dik Piramit ve Koni",
            explanation:
              `Piramit ve koni, eş tabanlı prizma/silindirin **üçte biri** hacmindedir.

### Dik Piramit

$$V_{\\text{piramit}} = \\dfrac{1}{3} \\times A_{\\text{taban}} \\times h$$

### Dik Dairesel Koni *(yarıçap $r$, yükseklik $h$)*

$$V_{\\text{koni}} = \\dfrac{1}{3} \\pi r^2 h$$

**Şunu aklında tut:** aynı $r$ ve $h$ için silindir hacmini bul, üçe böl → koni hacmi.

**Yükseklik, eğik yüzeyin uzunluğu, yarıçap** arasında Pisagor teoremi geçerlidir: $l^2 = r^2 + h^2$`,
            sampleQs: [
              "Taban kenarı 6 cm, yüksekliği 9 cm olan kare piramidin hacmi kaç cm³'tür?",
              "Yarıçapı 5 cm, yüksekliği 12 cm olan koninin hacmi kaçtır? (π cinsinden yaz.)",
              "Koni ve silindir aynı taban alanına ve yüksekliğe sahipse hacim oranları kaçtır?",
              "Yarıçapı 2 katına, yüksekliği yarıya indirilen bir koninin hacmi değişir mi?",
              "Hacmi 48 cm³ ve taban alanı 12 cm² olan piramidin yüksekliği kaç cm'dir?",
              "Koni ve küre arasındaki fark nedir? Kendi cümlelerinle açıkla.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "aziz_sancar",
    name: "Fen Bilimleri",
    emoji: "🔬",
    color: "#3FAE82",
    bg: "bg-mint-100",
    units: [
      {
        id: "fen-1",
        title: "1. Ünite: Mevsimler ve İklim",
        topics: [
          {
            id: "fen-1-1",
            title: "Mevsimlerin Oluşumu",
            explanation:
              "Mevsimler, Dünya'nın ekseninin 23,5° eğik olması ve güneş etrafındaki yıllık hareketinden kaynaklanır; mesafe değil eğiklik belirleyicidir. Kuzey yarımküre Güneş'e daha dik baktığında yaz yaşanırken güney yarımküre kışı yaşar. Bu yüzden Temmuz'da Türkiye yazı yaşarken Arjantin kış geçirir.",
          },
          {
            id: "fen-1-2",
            title: "Hava Olayları",
            explanation:
              "Yağmur, kar, dolu, sis ve fırtına gibi hava olayları atmosferde nem, sıcaklık ve basınç farklılıklarından doğar. Hava durumu kısa süreliğini değişkenliğiyle ölçülürken iklim onlarca yılın ortalamasıdır. Bulutların oluşumu, soğuyan havanın doyma noktasına ulaşıp su buharını yoğunlaştırmasıyla gerçekleşir.",
          },
          {
            id: "fen-1-3",
            title: "İklim",
            explanation:
              "İklim, bir bölgenin uzun yıllar boyunca gözlemlenen ortalama hava koşullarını tanımlar; enlem, denize yakınlık, yükselti ve bitki örtüsü iklimi belirler. Türkiye'de Karadeniz kıyıları ılıman okyanusal, İç Anadolu kıta iklimiyle karakterize edilir. İklim değişikliği ise insan faaliyetleriyle atmosferdeki sera gazlarının artışından kaynaklanır.",
          },
        ],
      },
      {
        id: "fen-2",
        title: "2. Ünite: DNA ve Genetik Kod",
        topics: [
          {
            id: "fen-2-1",
            title: "Nükleotid, Gen, DNA ve Kromozom",
            explanation:
              "DNA nükleotid adı verilen şeker-fosfat-baz üçlüsünden oluşan ve çift sarmal yapıda olan bir moleküldür. Gen, DNA üzerinde belirli bir proteini kodlayan bölgedür; her insan hücresinde 46 kromozomda yaklaşık 20.000–25.000 gen yer alır. Baz çiftleri (A-T, G-C) DNA ipliklerini birbirine bağlar ve genetik bilgiyi taşır.",
          },
          {
            id: "fen-2-2",
            title: "DNA'nın Kendini Eşlemesi ve Kalıtım",
            explanation:
              "Hücre bölünmesi öncesinde DNA sarmalı açılır ve her iplik şablon olarak kullanılarak yeni ikinci iplik sentezlenir; buna yarı tutucu eşlenme denir. Kalıtım; özelliklerin ebeveynlerden çocuklara genler aracılığıyla aktarılmasıdır. Dominant genler sadece bir kopyayla özelliği gösterirken resesif genler iki kopya gerektir.",
          },
          {
            id: "fen-2-3",
            title: "Mutasyon ve Modifikasyon",
            explanation:
              "Mutasyon, DNA dizisinde kalıcı ve kalıtsal bir değişiklik olup radyasyon, kimyasal maddeler ya da kendiliğinden gerçekleşebilir. Modifikasyon ise çevre koşullarının canlı üzerinde oluşturduğu geçici, kalıtsal olmayan değişikliklerdir. Güneşe maruz kalan birinin bronzlaşması modifikasyon; beyaz çiçeklerden pembe çiçekler üreyen bitki mutasyon sonucudur.",
          },
          {
            id: "fen-2-4",
            title: "Adaptasyon ve Biyoteknoloji",
            explanation:
              "Adaptasyon, canlıların yaşadıkları ortama uyum sağlamak için nesiller boyu geliştirdikleri kalıtsal özelliklerdir; örneğin kutup ayısının kalın kürk tabakası. Biyoteknoloji, canlı sistemleri ürün ve hizmet geliştirmek için kullanmayı kapsar; insülin üretimi ve GDO'lu bitkiler buna örnektir. Biyoteknoloji hem tıp hem tarım alanlarında devrim yaratmaya devam etmektedir.",
          },
        ],
      },
      {
        id: "fen-3",
        title: "3. Ünite: Basınç",
        topics: [
          {
            id: "fen-3-1",
            title: "Katı Basıncı",
            explanation:
              `$$\\boxed{P = \\dfrac{F}{A}}$$

| Sembol | Anlamı | Birimi |
|---|---|---|
| $P$ | Basınç | Pascal (Pa) |
| $F$ | Kuvvet | Newton (N) |
| $A$ | Yüzey Alanı | m² |

**Alan küçülür → basınç artar.** Bu yüzden:
- Sivri çivi kolayca girer (küçük $A$, büyük $P$)
- Kar ayakkabısı batmayı önler (büyük $A$, küçük $P$)

**LGS sorusu tipi:** Aynı ağırlıktaki iki cisimden hangisi daha fazla basınç uygular? → Taban alanı küçük olanı!`,
            sampleQs: [
              "200 N kuvvet 0,5 m² alana uygulanırsa basınç kaç Pa'dır?",
              "Basıncı azaltmak için ne yapmalısın? Kuvvet sabit ise.",
              "Sivri uçlu kalem neden düz uçluya göre kağıdı daha kolay deler?",
              "Karda yürüyen biri ayağına kar ayakkabısı takarsa basınç artar mı azalır mı?",
              "Basıncı iki katına çıkarmak için yüzey alanını ne yapman gerekir?",
              "60 N ağırlıklı bir cisim 0,3 m² alana basıyor. Basınç kaç Pa'dır?",
              "Bir bıçak ve tahta kaşık aynı kuvvetle ekmeğe sürülürse hangisi daha kolay keser? Neden?",
              "Astronotların Ay'da ağırlıkları 6'da 1'e düşer. Ayakkabı tabanı aynı kalırsa basınç kaç kat değişir?",
            ],
          },
          {
            id: "fen-3-2",
            title: "Sıvı Basıncı",
            explanation:
              `$$\\boxed{P = \\rho \\cdot g \\cdot h}$$

| Sembol | Anlamı |
|---|---|
| $\\rho$ (rho) | Sıvı yoğunluğu (kg/m³) |
| $g$ | Yerçekimi ivmesi (≈ 10 m/s²) |
| $h$ | Sıvıdaki derinlik (m) |

**Temel Özellikler:**
- Sıvı basıncı **yöne bağlı değildir**; aynı derinlikte her yönde eşit.
- Sıvı basıncı kabın şekline bağlı **değildir**.
- **Bağlı kaplar:** Aynı yoğunluktaki sıvı düzeyi her kolda eşit olur.

**Örnek:** Deniz suyu ($\\rho = 1025$ kg/m³) 10 m derinlikte:
$P = 1025 \\times 10 \\times 10 = 102\\,500$ Pa`,
            sampleQs: [
              "Yoğunluğu 1000 kg/m³ olan sıvının 5 m derinliğindeki basıncı kaç Pa'dır? (g = 10 m/s²)",
              "Bağlı kaplarda sıvı seviyeleri ne zaman eşit olur?",
              "Sıvı basıncı kabın şekline bağlı mıdır? Açıkla.",
              "Derinlik 3 katına çıkarsa sıvı basıncı kaç kat artar?",
              "Tatlı su (1000 kg/m³) ile tuzlu su (1025 kg/m³) aynı derinlikte. Hangisinin basıncı daha büyük? Neden?",
              "Deniz tabanındaki 200 m derinlikte su basıncını hesapla. (ρ = 1000 kg/m³, g = 10)",
              "Bir U borusu var; sol kola su sağ kola yağ (daha hafif) eklendi. Yağ tarafı mı su tarafı mı yüksekte durur?",
              "Sıvı basıncı ile katı basıncı arasındaki en önemli fark nedir?",
            ],
          },
          {
            id: "fen-3-3",
            title: "Basıncın Günlük Hayattaki Uygulamaları",
            explanation:
              "Hidrolik sistemler (araç freni, ekskavatör) sıvı basıncı ile küçük kuvveti büyük kuvvete çevirir. Şişe kapakları, enjektörler ve pompalarda basınç farkından yararlanılır. Uçaklarda kabin basıncı dış atmosfer basıncından yüksek tutularak yolcuların rahat nefes alması sağlanır.",
          },
        ],
      },
      {
        id: "fen-4",
        title: "4. Ünite: Madde ve Endüstri",
        topics: [
          {
            id: "fen-4-1",
            title: "Periyodik Sistem",
            explanation:
              "Elementler artan atom numarasına göre düzenlenmiş olan periyodik tabloda aynı sütundaki (grup) elementler benzer kimyasal özellikler gösterir. Metaller tablonun sol ve alt kısmında, ametaller sağ üst kısmında yer alır; soygazlar en sağ grubu oluşturur. Bir elementin periyot ve grup numarası, elektron dizilimini ve kimyasal davranışını doğrudan belirler.",
          },
          {
            id: "fen-4-2",
            title: "Kimyasal Tepkimeler ve Asit-Baz",
            explanation:
              "Kimyasal tepkimelerde maddeler atomlarını yeniden düzenleyerek farklı özellikte yeni maddeler üretir; kütlenin korunumu her zaman geçerlidir. Asitler suda H⁺ iyonu, bazlar ise OH⁻ iyonu bırakır; pH skalasında 7 nötr, 7'nin altı asidik, üstü baziktir. Limon suyu pH≈2 ile asitken temizlik sodası pH≈9 ile baziktir.",
          },
          {
            id: "fen-4-3",
            title: "Hal Değişimleri",
            explanation:
              "Madde katı, sıvı ve gaz halleri arasında ısı alışverişi yaparak geçiş yapar; erime, donma, buharlaşma, yoğuşma, süblimleşme ve kırağılaşma bu değişimlerdir. Hal değişimi süresince sıcaklık sabit kalır; alınan ya da verilen ısı faz değişim ısısı olarak adlandırılır. Terin buharlaşması, vücudun ısısını düşürmek için alınan ısıyı kullandığından serinletici etki yaratır.",
          },
          {
            id: "fen-4-4",
            title: "Kimya Endüstrisi ve Türkiye",
            explanation:
              "Türkiye'de kimya endüstrisi petrokimya, ilaç, boya ve gübre sektörlerini kapsar; boru hatları ve rafineriler bu altyapının temelini oluşturur. Kimyasal üretimde hammadde temin, işleme ve ürün kalite kontrolü birbirini izleyen süreçlerdir. Kimya mühendisliği, kimya öğretmenliği ve eczacılık bu sektörde kariyer seçenekleri arasındadır.",
          },
        ],
      },
      {
        id: "fen-5",
        title: "5. Ünite: Basit Makineler",
        topics: [
          {
            id: "fen-5-1",
            title: "Kaldıraçlar",
            explanation:
              "Kaldıraç, bir destek noktası (fulcrum) etrafında dönen rijit bir çubuktur; kuvvet kolu/yük kolu oranı mekanik avantaj verir. Birinci sınıf kaldıraçta destek orta noktadadır (makas, kerpeten); ikinci sınıf kaldıraçta yük ortadır (el arabası); üçüncü sınıf kaldıraçta kuvvet ortadadır (cımbız). Uzun kuvvet kolu ile küçük kuvvetle büyük yük kaldırabilirsin.",
          },
          {
            id: "fen-5-2",
            title: "Kasnak ve Eğik Düzlem",
            explanation:
              "Sabit kasnak yalnızca kuvvetin yönünü değiştirirken hareketli kasnak mekanik avantaj sağlar; her hareketli kasnak kuvveti yarıya indirir. Eğik düzlem, kaldırılacak yükü daha küçük kuvvetle taşımayı sağlayan bir yüzeydir; uzun eğik düzlem daha az kuvvet ancak daha uzun mesafe gerektirir. Vida, kama ve çivi eğik düzlem prensibine dayanan makinelerdir.",
          },
          {
            id: "fen-5-3",
            title: "İş, Güç ve Verimlilik",
            explanation:
              `$$\\boxed{W = F \\cdot d} \\quad \\text{(Joule)}$$

*Kuvvet ve yol **dik** ise iş sıfırdır — örneğin çanta taşıyan biri yürürken iş yapmaz (ağırlık ↕, yol →).*

$$\\boxed{P = \\dfrac{W}{t}} \\quad \\text{(Watt)}$$

**Verimlilik:**

$$\\eta = \\dfrac{W_{\\text{faydalı}}}{W_{\\text{toplam}}} \\times 100\\%$$

Gerçek makinelerde $\\eta < 100\\%$, çünkü bir kısım enerji sürtünme ile ısıya dönüşür.

**Basit makine altın kuralı:** İş kazanamayız — kuvvetten kazanırsak mesafeden kaybederiz.`,
            sampleQs: [
              "50 N kuvvetle 4 m yol alındığında yapılan iş kaç J'dir?",
              "Elinde çanta taşıyarak yatay düzlemde yürüyen biri iş yapar mı? Neden?",
              "1000 J iş 5 saniyede yapılırsa güç kaç W'tır?",
              "Verimliliği %80 olan bir makine 400 J faydalı iş üretmek için toplam kaç J enerji tüketir?",
              "Kuvvet ve hareket yönü dik açı yapıyorsa iş neden sıfırdır?",
              "100 W gücündeki ampul 1 saatte kaç J enerji tüketir?",
              "Bir atlet 60 kg ağırlığını 2 m yukarı kaldırıyor. Yaptığı iş kaç J'dir? (g = 10)",
              "Basit makineler iş miktarını değiştirir mi? Neyi değiştirir?",
            ],
          },
        ],
      },
      {
        id: "fen-6",
        title: "6. Ünite: Enerji Dönüşümleri ve Çevre Bilimi",
        topics: [
          {
            id: "fen-6-1",
            title: "Besin Zinciri ve Fotosentez",
            explanation:
              "Fotosentez sürecinde bitkiler güneş enerjisini kimyasal enerjiye dönüştürerek su ve karbondioksiti glikoza çevirir; oksijen ise yan ürün olarak salınır. Besin zincirinde üreticiler (bitkiler) enerjinin kaynağıdır; birincil, ikincil ve üçüncül tüketiciler bu enerjiyi aktarır ve her basamakta enerji %90 oranında azalır. Bu yüzden bir ekosistemde büyük yırtıcıların sayısı otçullara göre çok azdır.",
          },
          {
            id: "fen-6-2",
            title: "Madde Döngüleri",
            explanation:
              "Karbon, nitrojen ve su; biyosfer, atmosfer, litosfer ve hidrosfer arasında sürekli döner. Karbon döngüsünde fotosentez ile solunum karşılıklı dengeyi sağlarken insan kaynaklı CO₂ emisyonları bu dengeyi bozarak iklim değişikliğine yol açar. Azot döngüsünde azot bağlayan bakteriler toprağı besler ve tarımsal verimliliği artırır.",
          },
          {
            id: "fen-6-3",
            title: "Sürdürülebilir Kalkınma",
            explanation:
              "Sürdürülebilir kalkınma, bugünün ihtiyaçlarını gelecek nesillerin kendi ihtiyaçlarını karşılama kapasitesini tehlikeye atmadan karşılamaktır. Yenilenebilir enerji kaynakları (güneş, rüzgâr, su), geri dönüşüm ve ekolojik ayak izini azaltmak bu yaklaşımın temel araçlarıdır. LGS'de çevre sorunlarının nedenleri ve çözüm önerileri sıkça sınava girer.",
          },
        ],
      },
      {
        id: "fen-7",
        title: "7. Ünite: Elektrik Yükleri ve Elektrik Enerjisi",
        topics: [
          {
            id: "fen-7-1",
            title: "Elektriklenme Çeşitleri",
            explanation:
              "Cisimlerin elektrik yüklenmesi sürtünme, temas ve etki yoluyla gerçekleşir; negatif yük alan cisim elektron kazanmış, pozitif yük alan ise elektron kaybetmiştir. Aynı işaretli yükler birbirini iter, zıt işaretli yükler birbirini çeker. Statik elektrik bu prensibe dayanır; iki farklı malzeme sürtüldüğünde elektron transferi olur.",
          },
          {
            id: "fen-7-2",
            title: "Elektrik Enerjisinin Dönüşümleri",
            explanation:
              "Elektrik enerjisi; ısı (ütü), ışık (ampul), hareket (motor) ve ses (hoparlör) enerjisine dönüşebilir. Bir devrede pil kimyasal enerjiyi elektrik enerjisine çevirirken lamban bu elektriği ışığa ve ısıya dönüştürür. Enerji dönüşümlerinde toplam enerji korunur; ancak dönüşen her enerjinin bir kısmı kullanışsız ısıya dönüşerek kaybolur.",
          },
          {
            id: "fen-7-3",
            title: "Elektrik Enerjisinin Tasarruflu Kullanımı",
            explanation:
              "Elektrik enerjisini tasarruflu kullanmak hem ekonomik hem de çevresel açıdan önemlidir; LED ampuller, enerji verimli cihazlar ve standby modunu kapatmak tüketimi ciddi ölçüde azaltır. Türkiye'de elektriğin büyük bölümü doğalgaz, kömür ve hidroelektrik santrallerinden üretilmektedir. Yenilenebilir enerji kaynaklarına geçiş hem karbon ayak izini azaltır hem de enerji bağımsızlığını artırır.",
          },
        ],
      },
    ],
  },
  {
    id: "ataturk",
    name: "T.C. İnkılap Tarihi",
    emoji: "🇹🇷",
    color: "#6B57DC",
    bg: "bg-brand-50",
    units: [
      {
        id: "ink-1",
        title: "1. Ünite: Bir Kahraman Doğuyor",
        topics: [
          {
            id: "ink-1-1",
            title: "XX. Yüzyılın Başlarında Osmanlı",
            explanation:
              "XX. yüzyıla girerken Osmanlı Devleti 'Hasta Adam' lakabıyla anılıyor, azınlık isyanları ve büyük güçlerin baskısıyla siyasi açıdan çökme sürecindeydi. Kapitülasyonlar, yabancı şirketlerin ayrıcalıkları ve dış borçlar ekonomik egemenliği zedelemişti. Bu ortam milliyetçi ve kurtarıcı bir lider özlemini zorunlu kılıyordu.",
          },
          {
            id: "ink-1-2",
            title: "Mustafa Kemal'in Eğitim ve Fikir Hayatı",
            explanation:
              "Mustafa Kemal, Selanik'te doğdu; askeri eğitimde matematiğe olan ilgisi dikkat çekti ve kendi kendini Kemal adıyla tanımladı. Harbiye'de milliyetçi ve özgürlükçü fikirlerle tanışarak Fransız Devrimi'nin ideallerinden etkilendi. Öğrencilik yıllarında gizli örgütlere katılması, siyasi yargıyı erken geliştirdiğini gösterir.",
          },
          {
            id: "ink-1-3",
            title: "Mustafa Kemal'in Askerlik Hayatı",
            explanation:
              "Trablus, Balkan Savaşları ve özellikle Çanakkale cephelerinde üstün komuta kabiliyeti göstererek ad kazandı. Çanakkale'deki 'Ben size savaşmayı değil, ölmeyi emrediyorum' sözü vatanseverlik ve fedakârlığın simgesi oldu. Bu cephedeki başarıları ona hem uluslararası saygınlık kazandırdı hem de Millî Mücadele'nin zeminini hazırladı.",
          },
        ],
      },
      {
        id: "ink-2",
        title: "2. Ünite: Millî Uyanış — Bağımsızlık Yolunda",
        topics: [
          {
            id: "ink-2-1",
            title: "Birinci Dünya Savaşı ve Osmanlı",
            explanation:
              "Osmanlı Devleti, İttifak güçleri (Almanya, Avusturya-Macaristan) yanında savaşa girdi ve Çanakkale, Kafkasya, Filistin ve Irak cephelerinde ağır kayıplar verdi. Mondros Mütarekesi (30 Ekim 1918) ile savaştan çekilen Osmanlı, büyük bölgesini işgale terk etti. Bu yenilgi Millî Mücadele'nin fitilini ateşledi.",
          },
          {
            id: "ink-2-2",
            title: "İzmir'in İşgali ve Kuvâ-yı Millîye",
            explanation:
              "15 Mayıs 1919'da Yunanistan'ın İzmir'i işgal etmesi halk arasında büyük öfke yarattı ve silahlı direniş hareketlerinin çekirdeği olan Kuvâ-yı Millîye'yi doğurdu. Bu düzensiz kuvvetler düşman kuvvetlerini yavaşlatırken Mustafa Kemal Samsun'a çıkarak millî örgütlenmeyi başlattı. Kongre hareketi (Erzurum, Sivas) bölgesel direnci ulusal bir amaca dönüştürdü.",
          },
          {
            id: "ink-2-3",
            title: "BMM'nin Açılması ve Misak-ı Millî",
            explanation:
              "Misak-ı Millî, 28 Ocak 1920'de Osmanlı Meclisi'nin kabul ettiği ve millî sınırları çizen bağımsızlık belgesidir. 23 Nisan 1920'de Ankara'da Büyük Millet Meclisi açıldı; bu, egemenliğin kayıtsız şartsız millete ait olduğunun ilanıydı. Sevr Antlaşması Anadolu'yu paylaştırmayı öngördüğünden hiçbir zaman yürürlüğe giremedi.",
          },
        ],
      },
      {
        id: "ink-3",
        title: "3. Ünite: Ya İstiklal Ya Ölüm!",
        topics: [
          {
            id: "ink-3-1",
            title: "Cepheler ve Düzenli Ordunun Kuruluşu",
            explanation:
              "Doğu Cephesi'nde Ermenilere karşı kazanılan zaferle Kars'a kadar ilerlendi; ardından düzenli ordu kurularak cephe cephane ve asker yetersizliği sorunları giderildi. I. ve II. İnönü zaferleri İngiltere ve Fransa'nın Yunanistan'a olan desteği sorgulamasına yol açtı. Düzenli ordu kurulmadan dağınık kuvvetlerle kalıcı zafer kazanmak mümkün değildi.",
          },
          {
            id: "ink-3-2",
            title: "Sakarya Meydan Savaşı",
            explanation:
              "23 Ağustos – 13 Eylül 1921 tarihleri arasında 22 gün 22 gece süren Sakarya Savaşı, Mustafa Kemal'in Başkomutanlık yetkisiyle bizzat yönettiği dönüm noktasıdır. 'Hattı müdafaa yoktur, sathı müdafaa vardır; o satıh bütün vatandır' emriyle savunma stratejisi belirlendi. Yunan ilerleyişi durduruldu ve takip eden Büyük Taarruz için zemin hazırlandı.",
          },
          {
            id: "ink-3-3",
            title: "Büyük Taarruz ve Lozan",
            explanation:
              "26 Ağustos 1922'de başlayan Büyük Taarruz 9 Eylül'de İzmir'in kurtuluşuyla sonuçlandı ve Kurtuluş Savaşı'nı fiilen bitirdi. Mudanya Mütarekesi'nin ardından 24 Temmuz 1923'te imzalanan Lozan Antlaşması Türkiye'nin sınırlarını uluslararası arenada tanıttı. Lozan, kapitülasyonları ve dış borç yükümlülüklerini kaldırarak tam egemenliği sağladı.",
          },
        ],
      },
      {
        id: "ink-4",
        title: "4. Ünite: Atatürkçülük ve Çağdaşlaşan Türkiye",
        topics: [
          {
            id: "ink-4-1",
            title: "Cumhuriyet'in İlanı ve Atatürk İlkeleri",
            explanation:
              "29 Ekim 1923'te Cumhuriyet ilan edildi; egemenliğin kayıtsız şartsız millete ait olduğu anayasal güvence altına alındı. Atatürk'ün altı ilkesi (Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, Devrimcilik) Türk modernleşmesinin anayasası niteliğindedir. Bu ilkeler 1937 yılında Anayasa'ya eklenerek kalıcı hale getirildi.",
          },
          {
            id: "ink-4-2",
            title: "Hukuk, Eğitim ve Kıyafet İnkılapları",
            explanation:
              "Medeni Kanun (1926) ile kadın-erkek eşitliği, miras ve evlilik hukukunda köklü değişiklikler sağlandı. Tevhid-i Tedrisat Kanunu (1924) tüm okulları devlet çatısı altında birleştirdi; Harf İnkılabı (1928) Latin alfabesine geçilerek okuryazarlık oranını artırdı. Şapka Kanunu ve kıyafet düzenlemeleri çağdaş görünümü simgeliyordu.",
          },
          {
            id: "ink-4-3",
            title: "Ekonomik İnkılaplar",
            explanation:
              "İzmir İktisat Kongresi (1923) ulusal ekonominin temellerini attı; devletçilik ilkesi gereği sanayi kuruluşları devlet eliyle kuruldu. Tarım alanında köylüyü aşardan kurtarmak ve devlet desteğiyle üretimi artırmak hedeflendi. Sümerbank, Etibank ve Karabük Demir-Çelik Tesisleri bu dönemin simge sanayi kuruluşlarıdır.",
          },
          {
            id: "ink-4-4",
            title: "Kadın Hakları",
            explanation:
              "Türk kadını 1930'da belediye seçimlerinde, 1934'te ise milletvekili seçimlerinde oy kullanma hakkı kazandı; bu tarih pek çok Batı Avrupa ülkesinden önceye denk gelir. Medeni Kanun boşanma ve mülkiyet haklarında da eşitlik sağladı. Bu gelişmeler kadının toplumsal ve siyasi yaşama etkin katılımının önünü açtı.",
          },
        ],
      },
      {
        id: "ink-5",
        title: "5. Ünite: Demokratikleşme Çabaları",
        topics: [
          {
            id: "ink-5-1",
            title: "Çok Partili Hayata Geçiş Denemeleri",
            explanation:
              "Terakkiperver Cumhuriyet Fırkası (1924) ve Serbest Cumhuriyet Fırkası (1930) çok partili sisteme geçiş için yapılan ancak zamanı gelmediği görülen denemelerdir. Her iki parti de kısa sürede kapatıldı; ardından gerçek çok partili hayat 1946'da Demokrat Parti'nin kuruluşuyla başladı. Bu süreç, demokratikleşmenin sancılı fakat kararlı bir süreç olduğunu gösterir.",
          },
          {
            id: "ink-5-2",
            title: "Türkiye'nin Jeopolitik Konumu ve Sorumluluklar",
            explanation:
              "Türkiye; Asya, Avrupa ve Orta Doğu'nun kesişim noktasında bulunmasıyla stratejik öneme sahip bir konumdadır. Boğazlar üzerindeki hâkimiyet hem ticaret hem de güvenlik açısından uluslararası dengede belirleyici bir rol oynar. Bu konum Türkiye'ye hem fırsatlar hem de sorumluluklar yükler.",
          },
        ],
      },
      {
        id: "ink-6",
        title: "6. Ünite: Atatürk Dönemi Türk Dış Politikası",
        topics: [
          {
            id: "ink-6-1",
            title: "Temel İlkeler ve Lozan Sonrası Süreç",
            explanation:
              "Atatürk dönemi dış politikasının temel ilkesi 'Yurtta sulh, cihanda sulh'tur; saldırgan olmayan ve statükoyu koruyan bir çizgi benimsenmiştir. Lozan'dan kalan sorunlar (Musul, nüfus mübadelesi, dış borçlar) tek tek diplomasiyle çözüldü. Milletler Cemiyeti'ne 1932'de üye olunarak uluslararası meşruiyet pekiştirildi.",
          },
          {
            id: "ink-6-2",
            title: "Balkan Antantı ve Montrö Sözleşmesi",
            explanation:
              "1934'te Yunanistan, Romanya ve Yugoslavya ile imzalanan Balkan Antantı, Güneydoğu Avrupa'da güvenlik işbirliğini hedefliyordu. Montrö Boğazlar Sözleşmesi (1936) ile Türkiye Boğazlar'daki egemenliğini geri kazandı ve bölgeden geçiş kurallarını belirleme hakkına sahip oldu. Bu antlaşma bugün hâlâ geçerliliğini korumaktadır.",
          },
          {
            id: "ink-6-3",
            title: "Hatay'ın Anavatana Katılması",
            explanation:
              "Fransa'nın Suriye mandası altındaki Hatay (İskenderun Sancağı), 1938'de özerk bir cumhuriyet ilan etti ve 1939'da referandumla Türkiye'ye katıldı. Bu süreç silahlı çatışma değil diplomatik müzakere ile tamamlandı ve Atatürk'ün barışçıl dış politika anlayışının somut göstergesidir. Atatürk, Hatay'ın kurtuluşunu göremeden 10 Kasım 1938'de hayatını kaybetti.",
          },
        ],
      },
      {
        id: "ink-7",
        title: "7. Ünite: Atatürk'ün Ölümü ve Sonrası",
        topics: [
          {
            id: "ink-7-1",
            title: "Atatürk'ün Vefatı ve Mirası",
            explanation:
              "Mustafa Kemal Atatürk 10 Kasım 1938'de hayatını kaybetti; ardından İsmet İnönü cumhurbaşkanı seçildi. Atatürk'ün mirası; modern Türk devleti, Türk dili ve tarihi çalışmaları, eğitim reformları ve kadın haklarını kapsar. Bu miras Anıtkabir'de ve her yıl yapılan anma törenleriyle yaşatılmaktadır.",
          },
          {
            id: "ink-7-2",
            title: "İkinci Dünya Savaşı ve Türkiye",
            explanation:
              "İkinci Dünya Savaşı'nda Türkiye tarafsızlık politikası izledi ve her iki bloğa da ticaret antlaşmaları yaparak denge gözetmeye çalıştı. Savaşın ekonomik etkileri (kıtlık, Varlık Vergisi tartışmaları) toplumsal dengesizliklere neden oldu. Savaşın sona ermesinin ardından Türkiye ABD ile ilişkileri güçlendirip NATO'ya girme sürecini başlattı.",
          },
          {
            id: "ink-7-3",
            title: "Çok Partili Sisteme Geçiş",
            explanation:
              "1946'da Demokrat Parti kurularak Türkiye çok partili sisteme gerçek anlamda geçti ve 1950 seçimlerinde DP büyük çoğunlukla iktidar oldu. Bu gelişme Türk demokrasisinin olgunlaşması açısından tarihi bir dönüm noktasıdır. Ancak DP dönemi ekonomik baskı ve siyasi özgürlük sorunlarıyla da anılmaktadır.",
          },
        ],
      },
    ],
  },
  {
    id: "mevlana",
    name: "Din Kültürü",
    emoji: "🕊️",
    color: "#6366F1",
    bg: "bg-brand-50",
    units: [
      {
        id: "din-1",
        title: "1. Ünite: Kader İnancı",
        topics: [
          {
            id: "din-1-1",
            title: "Kader ve Kaza",
            explanation:
              "Kader, Allah'ın her şeyi önceden bilmesi ve belirlemesidir; kaza ise bu belirlemenin gerçekleşmesidir. İslam'da kader inancı imanın altı şartından biridir ve insanın iradesini ortadan kaldırmaz. Başarı ve başarısızlık ikisi de kaderin parçasıdır; sorumluluk insanın özgür tercihinden doğar.",
          },
          {
            id: "din-1-2",
            title: "İnsanın İradesi ve Kader",
            explanation:
              "İslam'da insana cüz'i irade (sınırlı özgür irade) verilmiştir; insan neyi seçeceğini belirler, Allah ise her seçeneği önceden bilir. Bu inanç 'Allah her şeyi önceden yazdıysa insan neden sorumlu?' sorusunu yanıtlar. Kader anlayışı kötülüklerde sorumluluğu Allah'a yükleyen bir bahane değil; insanı sorumluluk bilincine taşıyan bir inançtır.",
          },
          {
            id: "din-1-3",
            title: "Hz. Musa (as) ve Ayetelkürsi",
            explanation:
              "Hz. Musa Firavun'a karşı mücadelesiyle sabrı, sebatı ve Allah'a olan güveni temsil eder; mucizeler aracılığıyla ilahi desteği görünür kılar. Ayetelkürsi (Bakara: 255) Allah'ın eşsiz büyüklüğünü, her şeyi kuşattığını ve hiç uyumadığını bildiren ayettir. Bu ayet Kur'an'ın en büyük ayeti olarak tanımlanır ve okunması faziletten sayılır.",
          },
        ],
      },
      {
        id: "din-2",
        title: "2. Ünite: Paylaşmak ve Yardımlaşmak",
        topics: [
          {
            id: "din-2-1",
            title: "İslam'da Paylaşma ve Yardımlaşma",
            explanation:
              "İslam, serveti yalnızca biriktirmek yerine toplumla paylaşmayı emreder; Kur'an'da yüzlerce ayette infak (Allah yolunda harcama) vurgulanır. Komşu hakkı, yetim ve yoksul hakkı İslam ahlakının temel taşlarındandır. Güçlüden alıp güçsüze vermek ekonomik adaleti sağlar ve toplumsal huzuru güçlendirir.",
          },
          {
            id: "din-2-2",
            title: "Zekât ve Sadaka",
            explanation:
              "Zekât, belirli bir servete (nisap) sahip Müslümanların mallarının kırkta birini ihtiyaç sahiplerine vermesiyle yerine getirilen bir ibadettir. Sadaka ise gönüllü yardımdır; zaman, emek ve bilgi de sadaka sayılır. Maun Suresi, yetim ve yoksula yardımı görmezden gelmenin dini inkâr sayılacağını açıkça bildirir.",
          },
          {
            id: "din-2-3",
            title: "Hz. Şuayb (as) ve Maun Suresi",
            explanation:
              "Hz. Şuayb Medyen halkına adil ticaret ve dürüstlüğü öğretmiş; ölçüyü ve tartıyı tam yapmaları için mücadele etmiştir. Bu peygamber örneği ekonomik adaleti inançla ilişkilendirir. Maun Suresi namaz kıldığı hâlde yoksulu itip kakana, yetimi gözetmeyene sert bir uyarı yöneltir.",
          },
        ],
      },
      {
        id: "din-3",
        title: "3. Ünite: Din, Birey ve Toplum",
        topics: [
          {
            id: "din-3-1",
            title: "Dinin Birey ve Toplum Üzerindeki Rolü",
            explanation:
              "Din, bireye anlam ve amaç verirken topluma ortak değerler, ahlak ve dayanışma kültürü kazandırır. İslam'ın beş şartı (kelime-i şehadet, namaz, oruç, zekât, hac) bireysel disiplin ile toplumsal uyumu dengeler. Dinin temel gayesi, insanı hem dünyada hem ahirette mutlu kılmak ve adaleti sağlamaktır.",
          },
          {
            id: "din-3-2",
            title: "Hz. Yusuf (as) ve Asr Suresi",
            explanation:
              "Hz. Yusuf'un hayatı sabır, af ve güven temalarını barındıran Kur'an'da en uzun anlatılan kıssadır. Kuyuya atılmaktan Mısır vezirliğine uzanan yolculuğu kardeşlerini affetmesiyle doruk noktasına ulaşır. Asr Suresi ise insanın zaman içinde kayıptan kurtulabilmesinin ancak iman, iyi amel, hak ve sabır tavsiyesiyle mümkün olduğunu öğretir.",
          },
        ],
      },
      {
        id: "din-4",
        title: "4. Ünite: Hz. Muhammed'in Kişiliği",
        topics: [
          {
            id: "din-4-1",
            title: "Doğruluk, Güvenilirlik ve Merhamet",
            explanation:
              "Hz. Muhammed (sav) peygamberliğinden önce de 'El-Emin' (güvenilir) lakabıyla anılırdı; bu özellik İslam'ın yayılmasında temel belirleyiciydi. Merhameti yalnızca insanlara değil hayvanlara ve doğaya da yönelikti; bir serçe yavrusunu inciten insanı uyardığı rivayet edilir. Affetmeyi önceleyen tavrı Mekke'nin fethinde düşmanlarına bile gösterdiği büyük affediş örneğiyle somutlaşır.",
          },
          {
            id: "din-4-2",
            title: "Danışmanlık, Cesaret ve Hakkaniyet",
            explanation:
              "Hz. Peygamber önemli kararlarda ashabıyla istişare ederdi; Uhud'da savaşa çıkıp çıkmama meselesinde genç sahabinin önerisiyle hareket etmesi bunun örneğidir. Hakkı söylemek ve uygulamak için tehlikeden çekinmedi; Kureyşlilerin tehditlerine rağmen tebliği sürdürdü. Devlet başkanı sıfatıyla zengin-fakir, güçlü-zayıf arasında eşit hukuku uygulamaya özen gösterdi.",
          },
          {
            id: "din-4-3",
            title: "İnsanlara Değer Vermek ve Kureyş Suresi",
            explanation:
              "Hz. Peygamber, insanları ırk, soy veya statüden bağımsız olarak değerlendirerek 'Üstünlük takvadadır' ilkesini yaşattı. İnsanlara karşı gözettiği ince saygı, kullandığı yumuşak dil ve karşısındakileri dinleme biçimi tarihte örnek gösterilmektedir. Kureyş Suresi Mekke halkını Kâbe'nin güvenliği ve rızık nimetleri için Allah'a şükretmeye çağırır.",
          },
        ],
      },
      {
        id: "din-5",
        title: "5. Ünite: İslam'ın Temel Kaynakları",
        topics: [
          {
            id: "din-5-1",
            title: "Kur'an-ı Kerim",
            explanation:
              "Kur'an-ı Kerim, Allah'ın Hz. Muhammed'e Cebrail aracılığıyla 23 yılda indirdiği ilahi kelamdır; 114 sure ve 6236 ayetten oluşur. Temel konuları tevhid (Allah'ın birliği), peygamberlik, ahiret, ibadet ve ahlaktır. Kur'an'ın en temel özelliği değişmezliği ve evrensel mesajıdır; kıyamete kadar korunacağı vadedilmiştir.",
          },
          {
            id: "din-5-2",
            title: "Sünnet ve Diğer Kaynaklar",
            explanation:
              "Sünnet, Hz. Peygamber'in söz (hadis), eylem ve tasviplerinin tümünü kapsar; İslam'ın ikinci temel kaynağıdır. İcma (âlimlerin görüş birliği) ve kıyas (benzetme yoluyla hüküm çıkarma) İslam hukukunun ikincil kaynaklarıdır. Bu dört kaynak İslam'daki çeşitli meselelerin nasıl ele alınacağını belirleyen temel çerçeveyi oluşturur.",
          },
          {
            id: "din-5-3",
            title: "Hz. Nuh (as)",
            explanation:
              "Hz. Nuh, tarihte en uzun tebliğ süresini (rivayete göre 950 yıl) harcayan ve büyük bir sabırla kavmini imana davet eden peygamberdir. Tufan kıssasında inananlar gemiye alınarak kurtarılırken inkârcılar sular altında kaldı. Hz. Nuh'un kıssası sabır, inanç ve Allah'a teslimiyetin en güçlü örneklerinden birini sunar.",
          },
        ],
      },
    ],
  },
  {
    id: "shakespeare",
    name: "İngilizce",
    emoji: "🎭",
    color: "#E58A5A",
    bg: "bg-coral-100",
    units: [
      {
        id: "eng-1",
        title: "Unit 1: Friendship",
        topics: [
          {
            id: "eng-1-1",
            title: "Describing Friends and Qualities",
            explanation:
              "Bu ünitede arkadaşlık ve kişilik özelliklerini anlatan sıfatlar (loyal, supportive, honest, reliable) öğrenilir. Bir arkadaşı tanımlamak için 'He/She is very...' veya 'What I like about him/her is...' kalıpları kullanılır. LGS'de bu kelimeler diyalog tamamlama ve okuma anlama sorularında sıkça çıkar.",
          },
          {
            id: "eng-1-2",
            title: "Making and Keeping Friends",
            explanation:
              "Arkadaşlık kurmak ve sürdürmek için kullanılan ifadeler: 'Would you like to...?', 'How about...?', 'Let's...' gibi öneri kalıplarını içerir. Kültürlerarası arkadaşlıkları tanımlarken teknoloji ve sosyal medyanın rolü de tartışılır. Dinleme sorularında arkadaşlık diyaloglarından kimlerin ne söylediğini takip etmek önemlidir.",
          },
          {
            id: "eng-1-3",
            title: "Comparing Friendships (Comparatives/Superlatives)",
            explanation:
              "Karşılaştırma sıfatları (more loyal, less honest) ve üstünlük sıfatları (the most reliable) bu ünitenin dilbilgisi odağıdır. Kısa sıfatlarda -er/-est eki, uzun sıfatlarda more/most kullanılır; düzensiz sıfatları (good-better-best) ezberlemek şarttır. LGS'de karşılaştırma soruları boşluk doldurma ve çoktan seçmeli biçimde sorulur.",
          },
        ],
      },
      {
        id: "eng-2",
        title: "Unit 2: Teen Life",
        topics: [
          {
            id: "eng-2-1",
            title: "Daily Routines and Free Time",
            explanation:
              "Günlük rutin ve boş zaman aktivitelerini anlatmak için geniş zaman (Simple Present) kullanılır; 'I usually...', 'She always...' gibi sıklık zarflarıyla pekiştirilir. Ergen yaşam tarzını tartışırken hobiler, ekranlar ve spor gibi konular ön plana çıkar. LGS'de geniş zaman sorularında özne-fiil uyumu ve sıklık zarfının konumu test edilir.",
          },
          {
            id: "eng-2-2",
            title: "Expressing Preferences and Opinions",
            explanation:
              "Tercih ifade etmek için 'I prefer... to...', 'I'd rather... than...' kalıpları; görüş bildirmek için 'I think/believe/feel that...' yapıları kullanılır. Bu ifadeler okuma parçalarında karakterlerin tutumunu anlamaya ve LGS'de doğru seçeneği bulmaya yardımcı olur. Konuşma sorularında kendi görüşünü İngilizce kurmayı pratik yapmak faydalıdır.",
          },
        ],
      },
      {
        id: "eng-3",
        title: "Unit 3: In the Kitchen",
        topics: [
          {
            id: "eng-3-1",
            title: "Food Vocabulary and Recipes",
            explanation:
              "Yemek malzemeleri, pişirme fiilleri (boil, fry, bake, chop) ve ölçü birimleri (a cup of, a teaspoon of) bu ünitenin sözcük odağıdır. Tarif (recipe) metinlerinde sıralı yönlendirmeler 'First... Then... Finally...' gibi bağlayıcılarla verilir. LGS'de tarif metinleri okuma anlama ve sıralama sorularında kullanılır.",
          },
          {
            id: "eng-3-2",
            title: "Quantifiers and Countable/Uncountable Nouns",
            explanation:
              "Sayılabilen isimler (apple, egg) ve sayılamayan isimler (water, flour) farklı nicelik belirleyicileri alır: some, any, much, many, a lot of, a few, a little. Bu ayrımı öğrenmek alışveriş, yemek tarifi ve günlük konuşma metinlerini anlamayı kolaylaştırır. LGS'de 'How much/many' sorularına doğru yanıt vermek için bu ayrım kritiktir.",
          },
        ],
      },
      {
        id: "eng-4",
        title: "Unit 4: On the Phone",
        topics: [
          {
            id: "eng-4-1",
            title: "Telephone Conversations",
            explanation:
              "Telefon konuşmalarında standart kalıplar: 'Could I speak to...?', 'Hold on, please.', 'Can I take a message?', 'I'll call back later.' Mesaj bırakma ve alma diyalogları LGS'de okuma ve dinleme sorularının sık konusudur. Telefon görgü kurallarını (etiquette) bilmek hem metin anlama hem de kelime soruları için yardımcıdır.",
          },
          {
            id: "eng-4-2",
            title: "Making Requests and Offers",
            explanation:
              "Rica ve teklif kalıpları: 'Could you...?', 'Would you mind...?', 'Shall I...?', 'Would you like me to...?'礼 Bu yapılar kibarlık düzeylerine göre ayrışır; modal fiillerle cümle kurabilmek LGS'de dilbilgisi bölümünde önemlidir. Reddediş ve kabul cümleleri de bu ünitenin anahtar ifadeleridir.",
          },
        ],
      },
      {
        id: "eng-5",
        title: "Unit 5: The Internet",
        topics: [
          {
            id: "eng-5-1",
            title: "Internet and Technology Vocabulary",
            explanation:
              "İnternet kelime dağarcığı: browse, upload, download, stream, log in, password, social media, online safety gibi terimler içerir. Dijital dünyadaki avantajlar ve riskler (cyberbullying, privacy) karşılaştırmalı metinlerde ele alınır. LGS'de teknoloji metinlerinde kelime anlamı ve bağlamdan çıkarım soruları sıkça görülür.",
          },
          {
            id: "eng-5-2",
            title: "Present Perfect Tense",
            explanation:
              "Present Perfect (have/has + past participle) geçmişte başlayıp şimdiye uzanan veya sonucu şu anla ilgili eylemleri anlatır: 'I have already finished.' / 'She hasn't called yet.' Ever, never, already, just, yet, since, for bu zamanla birlikte kullanılan kilit zarflardır. LGS'de Simple Past ile Present Perfect arasında seçim yapma soruları çıkar.",
          },
        ],
      },
      {
        id: "eng-6",
        title: "Unit 6: Adventures",
        topics: [
          {
            id: "eng-6-1",
            title: "Adventure Sports and Travel",
            explanation:
              "Macera sporları (rock climbing, paragliding, scuba diving) ve seyahat kelime dağarcığı bu ünitenin temasıdır. Geçmiş zaman (Simple Past) ve geçmişin belirli bir anındaki süregelen eylemi anlatan Past Continuous dilbilgisi konularıdır. 'While I was climbing, it started to rain.' gibi yapılar LGS'de sıkça sorulur.",
          },
          {
            id: "eng-6-2",
            title: "Sequencing Events in a Story",
            explanation:
              "Bir hikâyedeki olayları sıralamak için 'First, Then, After that, Finally, Meanwhile' bağlayıcıları kullanılır. Macera hikâyelerinde zirve noktası ve çözüm aşamalarını takip etmek okuma anlama için kritiktir. LGS'de doğru sırayı belirlemek ya da boşluğa uygun bağlayıcıyı seçmek sık karşılaşılan soru tipleridir.",
          },
        ],
      },
      {
        id: "eng-7",
        title: "Unit 7: Tourism",
        topics: [
          {
            id: "eng-7-1",
            title: "Describing Places and Giving Directions",
            explanation:
              "Turistik yerleri tanımlamak için betimleme sıfatları (magnificent, historic, crowded) ve 'It is famous for...' yapısı kullanılır. Yol tarifi için 'Turn left/right at...', 'Go straight ahead.', 'It's next to/opposite...' kalıpları öğrenilir. Harita okuma ve yer tarifi diyalogları LGS'de dinleme bölümünde sıkça çıkar.",
          },
          {
            id: "eng-7-2",
            title: "Modal Verbs for Advice (should/must/have to)",
            explanation:
              "Should öneri bildirirken (You should visit Cappadocia), must/have to zorunluluk ifade eder (You must carry your passport). Olumsuzları da iyi bilinmelidir: shouldn't (önerilmez), mustn't (yasak), don't have to (gerekli değil). LGS'de bu modal'lar arasındaki anlam farkını test eden sorular çıkar.",
          },
        ],
      },
      {
        id: "eng-8",
        title: "Unit 8: Chores",
        topics: [
          {
            id: "eng-8-1",
            title: "Household Chores and Responsibilities",
            explanation:
              "Ev işleri kelime dağarcığı: do the dishes, vacuum the carpet, take out the trash, do the laundry, set the table. Bu sözcükler aile içi sorumlulukları tartışan diyaloglar ve okuma parçaları için temel oluşturur. LGS'de bu kelimeleri doğru fiillerle eşleştirmek (do/make ayrımı dahil) önemlidir.",
          },
          {
            id: "eng-8-2",
            title: "Obligation and Permission (have to / be allowed to)",
            explanation:
              "'Have to' zorunluluk, 'don't have to' serbestlik, 'be allowed to' izin, 'not be allowed to' yasak anlamı taşır. Bu yapılar kural ve yönetmelikleri anlatan metinlerde sıkça geçer. Okul kuralları ya da aile içi sorumlulukları tartışan diyaloglar LGS'deki bu yapıları test etmek için popüler bağlamlardır.",
          },
        ],
      },
      {
        id: "eng-9",
        title: "Unit 9: Science",
        topics: [
          {
            id: "eng-9-1",
            title: "Scientific Processes and Discoveries",
            explanation:
              "Bilim insanlarını, buluşları ve deneyleri anlatan pasif yapılar (Passive Voice) bu ünitenin dilbilgisi odağıdır: 'Penicillin was discovered by Fleming.' Pasif yapı; aktarımda özne önemli olmadığında ya da bilinmediğinde tercih edilir. LGS'de aktif cümleyi pasife, pasifi aktife çevirmek sıkça sorulur.",
          },
          {
            id: "eng-9-2",
            title: "Cause and Effect in Scientific Texts",
            explanation:
              "Neden-sonuç bağlantıları kurmak için 'because, since, as a result, therefore, consequently, due to' bağlayıcıları kullanılır. Bilimsel metinlerde hipotez kurma ve deney sonuçlarını raporlama bu sözcüklere dayanır. LGS'de uygun bağlayıcıyı seçme ve paragrafların mantık ilişkisini anlama bu ünitenin test noktasıdır.",
          },
        ],
      },
      {
        id: "eng-10",
        title: "Unit 10: Natural Forces",
        topics: [
          {
            id: "eng-10-1",
            title: "Natural Disasters Vocabulary",
            explanation:
              "Doğal afet kelime dağarcığı: earthquake, tsunami, hurricane, flood, volcano eruption, drought ve bunlarla ilgili eylemler (struck, hit, damaged, destroyed). Bu kelimeler haber metinleri ve bilgi broşürlerinde karşılaşılan bağlamlarda kullanılır. LGS'de doğal afet metinlerinden çıkarım soruları ve kelime anlamı soruları gelir.",
          },
          {
            id: "eng-10-2",
            title: "Conditional Sentences (If clauses — Type 1 & 2)",
            explanation:
              "1. tip koşul cümleleri gerçekleşme ihtimali olan durumlar için: 'If it rains, we will cancel the trip.' 2. tip ise gerçek dışı ya da varsayımsal durumlar için: 'If I were a scientist, I would study earthquakes.' LGS'de if'in hangi kalıpla tamamlanacağı sıkça sorulur; zaman uyumuna dikkat etmek şarttır.",
          },
        ],
      },
    ],
  },
];
