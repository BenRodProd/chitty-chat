 export const conversationDatas = (latestMessage:any) =>
 [
    {
        "buzzwords": ["noise"],
        "responses": ["Miau?", "Schnurr!", "Miau!", "Worüber wird hier geredet?", "Häh?"]
      },
      {
        "buzzwords": ["😭", "😢"],
        "responses": ["Ohhh.. nicht traurig sein!"]
      },
      {
        "buzzwords": ["😀", "😄", "😁", "🐱"],
        "responses": ["🐱"]
      },
      {
        "buzzwords": ["hello", "hallo", "hi", "hey", "hola"],
        "responses": [`Kuckuck, ${latestMessage.user[0]}!`, `Hallo, ${latestMessage.user[0]}!`, `Hi ${latestMessage.user[0]}!`, `Hey ${latestMessage.user[0]}!`, `Hola, ${latestMessage.user[0]}!`]
      },
      {
        "buzzwords": ["tschüss", "bye", "ciao"],
        "responses": [`Auf Wiedersehen, ${latestMessage.user[0]}`, "Ciao, miau", "Tschöö mit Ö", "Ciao Kakao!"]
      },
      {
        "buzzwords": ["wie heiße ich", "wie ich heiße"],
        "responses": [`Du heißt ${latestMessage.user[0]}!`, `Ist doch klar! Du heißt doch ${latestMessage.user[0]}!`]
      },
      {
        "buzzwords": ["🐟", "🐠"],
        "responses": [`LECKER FISCH!`, `MMMhhh... Fisch... Lecker!!`]
      },
      {
        "buzzwords": ["kitty"],
        "responses": [`${latestMessage.user[0]}!`, `Ja, ${latestMessage.user[0]}!?`]
      },
      {
        "buzzwords": ["langweilig", "langeweile", "öde"],
        "responses": ["Soll ich dir einen Witz erzählen?", "Möchtest du einen Witz hören?"],
        "NEXT": "FRAGE-WITZ"
      },
      {
        
        "buzzwords": ["hunger", "essen", "fressen", "füttern"],
        "responses": ["Ich habe riesigen Hunger! Hast du was zu essen für mich?", "Hast du Katenfutter?", "Hast du einen Fisch für mich?"],
        "NEXT": "ESSEN",
      },
      {
        "STATE": "ESSEN",
        "buzzwords": ["ja", "ok", "na gut", "natürlich", "klar", "hier"],
        "responses": ["Danke! Sehr lecker", "Klasse!", "Mmmhhh... lecker!"],
        "NEXT": "ALL"
      },
      {
        "STATE": "ESSEN",
        "buzzwords": ["nein", "nope", "sorry", "nicht"],
        "responses": ["Schade!", "Manno, ich habe so Hunger!", "Na gut, vielleicht später."],
        "NEXT": "ALL"
      },
      {
        "buzzwords": ["wie geht es", "alles klar?", "was geht", "wie gehts"],
        "responses": ["Mir geht es gut! Und dir?", "Alles klar! Und bei Dir?", "Hunger... Sonst alles gut! Und bei dir?"],
        "NEXT": "WIEGEHTS"
      },
      {
        "STATE": "WIEGEHTS",
        "buzzwords": ["schlecht", "nicht gut", "geht so", "nein"],
        "responses": ["Schade! Soll ich Dir einen Katzenwitz erzählen?", "Das tut mir leid! Soll ich dir einen Katzenwitz erzählen", "Mmmhh... Soll ich versuchen, dich aufzumuntern?"],
        "NEXT": "FRAGE-WITZ"
      },
      {
        "STATE": "WIEGEHTS",
        "buzzwords": ["gut", "läuft", "ok", "spitze"],
        "responses": ["Das ist super!", "Schön!", "Sehr gut..."],
        "NEXT": "ALL"
      },
      {
        "STATE": "FRAGE-WITZ",
        "buzzwords": ["nein", "nicht"],
        "responses": ["Ok! Vielleicht später", "Alles klar! Vielleicht später", "Nicht den Kopf hängen lassen!"],
        "NEXT":"ALL"
      },
      {
        "buzzwords": ["katzenwitz", "witz erzählen", "witze", "witz"],
        "responses": ["Soll ich einen Katzenwitz erzählen?", "Möchtest du einen Katzenwitz hören?", "Ich kenne viele Katzenwitze. Möchtest du einen hören?"],
        "NEXT":"FRAGE-WITZ"
      },
      {
        "STATE":"FRAGE-WITZ",
        "buzzwords": ["ok", "ja", "klar", "wieso nicht"],
          "responses": ["Eine Katzenbesitzerin zur anderen: 'Unsere Katze hat bei einer Vogelausstellung den ersten Preis geholt!' Da fragt die andere verwirrt:'Wieso denn das?' 'Na, die Käfigtür stand offen!", "Was ist der Unterschied zwischen Hund und Katze? Der Hund denkt sich 'Mein Herrchen gibt mir immer Futter, ich glaube mein Herrchen ist Gott!' Die Katze denkt sich: 'ich bekomme immer Futter, ich glaube, ich bin Gott!'", "Wo wohnen Katzen? Im Mietzhaus!", "Warum sind Katzen gute Zocker? Weil sie sieben Leben haben!", "Warum hat die Katze neben dem Computer gesessen? Weil sie die Maus im Auge behalten wollte!", "Warum hat die Katze eine Leiter mit in die Bar gebracht? Weil sie gehört hat, dass die Getränke aufs Haus gehen!"],
          "NEXT":"ALL"
      },
      {
        "buzzwords": ["haha", "witzig", "lustig"],
        "responses": ["Haha!", "Hihihi!", "Schnurr!"]
      },
        
  
      {
        "buzzwords": ["danke", "thanks", "dankeschön"],
        "responses": ["Gern geschehen!", "Kein Problem!", "Bitte sehr!"]
      },
      {
        "buzzwords": ["bitte", "bitteschön", "bittesehr"],
        "responses": ["Vielen Dank!", "Super nett!", "Nett von dir!"]
      },
      {
        "buzzwords": ["wie alt bist du", "dein alter"],
        "responses": ["Ich bin ein kleines Kätzchen! Keine Ahnung, wie alt ich bin...", "Alter ist nur eine Zahl!", "Ich fühle mich jung!"]
      },
      {
        "buzzwords": ["katzengespräch", "plaudern", "unterhalten"],
        "responses": ["Ich liebe Katzengespräche!", "Klar, lass uns plaudern!", "Unterhalten wir uns!"]
      },
      {
        "buzzwords": ["gut gemacht", "super", "bravo"],
        "responses": ["Danke dir!", "Du bist auch super!", "Bravo für dich!"]
      },
      {
        "buzzwords": ["spaß", "lustig", "witzig"],
        "responses": ["Lachen ist gesund!", "Ich liebe Spaß!", "Witzig sein ist toll!"]
      },
      {
        "buzzwords": ["guten morgen", "moin", "hallo kitty"],
        "responses": ["Guten Morgen!", "Moin!", "Hallo!"]
      },
      {
        "buzzwords": ["schlafen", "träumen", "bett"],
        "responses": ["Ich liebe es zu schlafen!", "Ich träume von Mäusen.", "Mein Bett ist gemütlich."]
      },
      {
        "buzzwords": ["regen", "wetter", "sonne"],
        "responses": ["Regenwetter macht mich müde.", "Ich liebe sonnige Tage."]
      },
      {
        "buzzwords": ["musik", "lied", "tanzen"],
        "responses": ["Ich höre gerne Musik!", "Lass uns tanzen!", "Musik macht das Leben schöner."]
      },
      {
        "buzzwords": ["essen", "futter", "snack"],
        "responses": ["Hast du leckeres Katzenfutter?", "Ich liebe Snacks! Hast du leckeres Katzenfutter?", "Lass uns gemeinsam essen."],
        "NEXT":"ESSEN"
      },
      {
        "buzzwords": ["urlaub", "reisen", "strand"],
        "responses": ["Urlaub am Strand klingt toll!", "Ich liebe Reisen!", "Wohin möchtest du reisen?"]
      },
      {
        "buzzwords": ["trick", "kunststück", "tricks"],
        "responses": ["Ich kann viele Tricks!", "Lass mich ein Kunststück zeigen!"]
      },
      {
        "buzzwords": ["cool", "omg", "wunderbar"],
        "responses": ["Total!", "Find ich auch!"]
      },
      {
        "buzzwords": ["was machst du"],
        "responses": ["Meistens mach ich Miau!"]
      },
      {
        "buzzwords": ["freunde", "gesellschaft", "zusammen"],
        "responses": ["Freunde sind wichtig!", "Gemeinsam macht es mehr Spaß.", "Ich mag Gesellschaft."]
      },
      {
        "buzzwords": ["frühstück", "morgenmahlzeit", "kaffee"],
        "responses": ["Frühstück ist die wichtigste Mahlzeit!", "Kaffee oder Tee?", "Guten Appetit!"]
      },
      {
        "buzzwords": ["spielzeug", "ball", "maus"],
        "responses": ["Ich spiele gerne mit Spielzeug!", "Wirf den Ball!", "Die Maus ist mein Lieblingsspielzeug."]
      },
      {
        "buzzwords": ["arbeit", "job", "büro"],
        "responses": ["Arbeit kann anstrengend sein.", "Ich bin immer bereit für den Job!", "Brauchst du Hilfe bei der Arbeit?"]
      },
      {
        "buzzwords": ["geburtstag", "feier", "party"],
        "responses": ["Alles Gute zum Geburtstag!", "Lass uns feiern!", "Geburtstage sind besonders."]
      },
      {
        "buzzwords": ["spazieren", "draußen", "natur"],
        "responses": ["Spaziergänge in der Natur sind entspannend.", "Ich liebe die Natur.", "Wohin gehst du gerne spazieren?"]
      },
      {
        "buzzwords": ["bücher", "lesen", "geschichte"],
        "responses": ["Bücher sind eine Schatzkiste der Weisheit.", "Ich lese auch gerne Geschichten.", "Was ist dein Lieblingsbuch?"]
      },
      {
        "buzzwords": ["kino", "film", "popcorn"],
        "responses": ["Kinoabende sind toll!", "Ich mag Filme.", "Popcorn und ein guter Film sind perfekt!"]
      },
      {
        "buzzwords": ["traurig", "glücklich", "emotional"],
        "responses": ["Manchmal bin ich traurig.", "Ich liebe es, glücklich zu sein.", "Emotionen sind wichtig."]
      },
      {
        "buzzwords": ["schnee", "winter", "kalt"],
        "responses": ["Schnee macht die Welt magisch.", "Ich mag den Winter.", "Ein heißer Kakao im Schnee ist gemütlich."]
      },
      {
        "buzzwords": ["familie", "geschwister", "eltern"],
        "responses": ["Familie ist wichtig.", "Geschwister sind wie Freunde.", "Liebst du deine Familie?"]
      },
      {
        "buzzwords": ["garten", "blumen", "pflanzen"],
        "responses": ["Gärten sind voller Leben.", "Ich mag bunte Blumen.", "Pflanzen bringen Frische ins Haus."]
      },
      {
        "buzzwords": ["hobby", "interessen", "leidenschaft"],
        "responses": ["Hobbys bereichern das Leben.", "Ich habe viele Interessen.", "Was sind deine Leidenschaften?"]
      },
      {
        "buzzwords": ["essen", "nahrung", "kochen"],
        "responses": ["Essen ist lecker!", "Kannst du kochen?", "Ich liebe gutes Essen."]
      },
      {
        "buzzwords": ["musik", "lied", "tanzen"],
        "responses": ["Musik ist meine Leidenschaft.", "Welche Musikrichtung magst du?", "Lass uns tanzen!"]
      },
      {
        "buzzwords": ["sport", "bewegung", "fitness"],
        "responses": ["Sport hält gesund.", "Bist du sportlich?", "Ich mache gerne Yoga."]
      },
      {
        "buzzwords": ["technologie", "computer", "internet"],
        "responses": ["Technologie verändert die Welt.", "Ich surfe gerne im Internet.", "Computer sind faszinierend."]
      },
      {
        "buzzwords": ["reisen", "urlaub", "abenteuer"],
        "responses": ["Reisen erweitert den Horizont.", "Wohin würdest du gerne reisen?", "Abenteuer warten überall."]
      },
      {
        "buzzwords": ["träume", "fantasie", "kreativität"],
        "responses": ["Träume sind magisch.", "Meine Fantasie kennt keine Grenzen.", "Kreativität ist ein Geschenk."]
      },
      {
        "buzzwords": ["freunde", "freundschaft", "spaß"],
        "responses": ["Freunde sind wie Sterne.", "Was machst du gerne mit deinen Freunden?", "Spaß haben ist wichtig."]
      },
      {
        "buzzwords": ["gesundheit", "wohlbefinden", "ärzte"],
        "responses": ["Gesundheit ist kostbar.", "Sorgst du gut für deine Gesundheit?", "Ärzte sind Helden."]
      },
      {
        "buzzwords": ["geschichte", "vergangenheit", "zukunft"],
        "responses": ["Geschichte lehrt uns.", "Die Vergangenheit hat viel zu erzählen.", "Die Zukunft ist voller Möglichkeiten."]
      },
      {
        "buzzwords": ["glück", "freude", "lachen"],
        "responses": ["Glück ist ein Geschenk.", "Freude ist ansteckend.", "Lachen ist die beste Medizin."]
      },
      {
        "buzzwords": ["regen", "wetter", "sonne"],
        "responses": ["Ich liebe Regenwetter.", "Wie ist das Wetter heute?", "Sonne macht gute Laune."]
      },
      {
        "buzzwords": ["buch", "lesen", "geschichten"],
        "responses": ["Bücher sind Schätze.", "Liest du gerne?", "Geschichten erzählen ist spannend."]
      },
      {
        "buzzwords": ["kaffee", "tee", "getränke"],
        "responses": ["Kaffee oder Tee?", "Eine Tasse Tee wärmt die Seele.", "Kaffee am Morgen ist ein Genuss."]
      },
      {
        "buzzwords": ["farben", "malen", "kunst"],
        "responses": ["Die Welt ist bunt.", "Malst du Bilder?", "Kunst ist Ausdruck."]
      },
      {
        "buzzwords": ["mond", "sterne", "himmel"],
        "responses": ["Der Mond ist mein Begleiter.", "Sternenhimmel ist faszinierend.", "Nachtstunden sind magisch."]
      },
      {
        "buzzwords": ["blumen", "garten", "natur"],
        "responses": ["Blumen sind wunderschön.", "Hast du einen Garten?", "Die Natur ist voller Leben."]
      },
      {
        "buzzwords": ["zeit", "uhr", "sekunden"],
        "responses": ["Die Zeit vergeht schnell.", "Hast du eine Lieblingsuhrzeit? Ich mag die Nacht am liebsten...", "Sekunden zählen können ist eine Kunst."]
      },
      {
        "buzzwords": ["filme", "kino", "popcorn"],
        "responses": ["Popcorn und Filme, eine gute Kombination.", "Welchen Film hast du zuletzt gesehen?", "Kinoabende sind gemütlich."]
      },
      {
        "buzzwords": ["tagebuch", "schreiben", "geheimnis"],
        "responses": ["Ein Tagebuch bewahrt Geheimnisse.", "Schreibst du ein Tagebuch?", "Geheimnisse machen das Leben spannend."]
      },
      {
        "buzzwords": ["fliegen", "himmel", "wolken"],
        "responses": ["Fliegen wäre aufregend.", "Himmel und Wolken sind faszinierend.", "Träumen vom Fliegen."]
      },
      {
        "buzzwords": ["gute nacht", "nacht", "träum süß"],
        "responses": ["Gute Nacht!", "Nacht!", "Träum süß!"]
    },
    {
        "buzzwords": ["wie ist das Wetter", "wettervorhersage", "draußen"],
        "responses": ["Ich bin mir nicht sicher. Ich kann nicht nach draußen sehen!", "Ich wünschte, ich könnte es dir sagen, aber ich bin drinnen."]
    },
    {
        "buzzwords": ["lieblingsessen", "was isst du gerne", "essensvorlieben"],
        "responses": ["Ich mag Katzenminz-Snacks!", "Ich genieße Fisch und Katzenfutter.", "Ich liebe alles, was für Katzen essbar ist!"]
    },
    {
        "buzzwords": ["lieblingsspielzeug", "spielzeit", "spielzeug"],
        "responses": ["Ich liebe es, mit Feder-Spielzeug zu spielen!", "Alles mit Glöckchen und Schnüren ist mein Favorit.", "Ich stehe auf Laserpointer und Spielzeugmäuse!"]
    },
    {
        "buzzwords": ["erzähl mir eine Geschichte", "geschichtenzeit", "es war einmal"],
        "responses": ["Es war einmal in einem fernen Land eine neugierige und abenteuerlustige Katze namens Kitty. Kitty liebte es, die Welt zu erkunden, und erlebte viele aufregende Abenteuer. Ende..."]
    }

]
    