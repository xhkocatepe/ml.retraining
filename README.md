# retraining
SAP ML Foundation Retraining Model Custom Dataset

# postman
SAP ML Foundation Postman Configurations

Öncelikle Cloud Foundry'de P1941701105trial hesaptan bir ML foundation oluşturuldu ve bize FaaS olarak kullanabileceğimiz servisler sunuldu.

Psotman'deki "SAP ML Foundation" Collection'unda 4 farklı yol izlendi;

	1-"API HUB"deki API KEY ile var olan servisler FaaS olarak çağrıldı.
	2-"BYOM" ile yazılan kendi python kodumuz deploy edilip request atılmaya çalışıldı, kendi modelimiz vs. oluşturuldu.
	3-"Retraining Model" ile kod yazılmadan kendi datasetlerimiz ile modeli yeniden train ettik bunu kişiler üzerinden yaptık( Fatih Terim, Çağatay Ulusoy, Cansu Dere, Beren Saat..)
	4-Herhangi bir model train etmeden direkt olarak Cloud Foundry ML Foundationdaki Servisler FaaS olarak kullanıldı. ( Örn: Resimde kaç kişi var? Resimdeki nesneler neler? )
	
NOT:
Bu Collection'da Authorization {{token}} değişkenine atandı, bunun için "FIRST RUN: Get Credentials" Request'i ile token alınıp AWS_EU_Live-sapcp_ml_foundation'a global olarak atandı artık her request bu token ile çağrılacak. Tekrar tekrar yazılmasına gerek yok. 
