# Magyarországi rádióamatőr klubok térképe

Ez a térkép a magyarországi rádióamatőr klubokat gyűjti össze egy helyen, egyszerű, gyors és mobilbarát formában.  
A projekt ötlete **HG7WFM Peti** (BKV Rádióklub) kezdeményezésére indult, közösségi együttműködésben.

A cél, hogy bárki könnyen megtalálhassa:
- a rádióklubokat,
- azok elérhetőségeit,
- online felületeit,
- és a hozzájuk tartozó alapinformációkat.

A térkép elérhető itt:  
**https://zolee1988.github.io/magyar_radioklub_terkep/**

A térképet készíti és karbantartja: **HG4ZKZ Zoli**

---

## Adatforrás

A klubok listája és adatai automatikusan a következő wikioldalról töltődnek be:

[https://wiki.ham.hu/index.php?title=Kategória:Rádióklubok](https://wiki.ham.hu/index.php?title=Kategória:Rádióklubok)

## Hogyan működik?

A térkép teljesen automatikusan épül fel a wiki adatai alapján:

1. A rendszer beolvassa a wikioldalon található táblázatot, amely a magyarországi rádióklubokat tartalmazza.
2. Minden sorból egy klubobjektum készül, a táblázat oszlopai alapján.
3. A QTH mező alapján meghatározzuk a klub földrajzi koordinátáit, és elhelyezzük a térképen.
4. A hívójel automatikusan a QRZ.com megfelelő oldalára mutató linkké alakul, így egy kattintással elérhető a klub hívójelének adatlapja.
5. A táblázatban található linkeknél a link szövege jelenik meg, de a háttérben a teljes URL-re mutat.
6. Az üres cellákat nem jelenítjük meg, hogy a popup tiszta és áttekinthető maradjon.
7. A térkép minden megnyitáskor a wiki aktuális tartalmát dolgozza fel, így mindig naprakész.

A feldolgozás teljesen automatikus, nem igényel kézi adatkarbantartást.
