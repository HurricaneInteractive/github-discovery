import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonSpinner,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonGrid,
  IonItem
} from '@ionic/react';

const Home: React.FunctionComponent = () => {

  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])

  const fetchRepos = async (q: string) => {

    if (q.trim() === "") {
      setResults([])
      return false;
    }

    setLoading(true)

    try {
      const data = await fetch(`https://api.github.com/search/repositories?q=${q}&sort=stars`);
      const json = await data.json();
      setResults(json.items || [])
    }
    catch(e) {
      console.error(e)
    }
    finally {
      setLoading(false)
    }
  }

  const renderCardItems = () => {
    return results.map((item: any) => (
      <IonCard key={item.id} class="ion-no-margin ion-margin-vertical">
        <IonCardHeader>
          <IonCardTitle>{item.name}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          {item.description}

          <IonGrid class="ion-no-padding ion-margin-top">
            <IonRow>
              <IonCol class="ion-no-padding">
                <a href={item.html_url} target="_blank">View on Github</a>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    ))
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Github Discovery</IonTitle>
        </IonToolbar>

        <IonSearchbar
          debounce={1000}
          onIonInput={(e: any) => {
            fetchRepos(e.target.value || "")
          }}
        />
      </IonHeader>
      <IonContent className="ion-padding">
        {
          loading ? (
            <IonRow justify-content-center>
              <IonCol style={{
                  display: "flex",
                  justifyContent: "center"
              }}>
                <IonSpinner name="crescent" />
              </IonCol>
            </IonRow>
          ) : (
            results.length === 0 ? (
              <h1>No content found</h1>
            ) : (
              renderCardItems()
            )
          )
        }
      </IonContent>
    </>
  );
};

export default Home;
