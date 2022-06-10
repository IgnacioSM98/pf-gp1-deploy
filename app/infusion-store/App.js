import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Login,
  Home,
  Tienda,
  Favoritos,
  Cuenta,
  DetalleProducto,
} from "./sources/Components/index.js";
import { useState, useEffect } from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { setData, getData } from "./sources/Functions/localStorage";
import * as Font from "expo-font";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const fetchFonts = async () => {
  await Font.loadAsync({
    Poppins: require("./assets/fonts/Poppins-Thin.ttf"),
    PoppinsM: require("./assets/fonts/Poppins-Medium.ttf"),
  });
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  useEffect(() => {
    fetchFonts();

    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricAvailable(compatible);

      // Para guardar el usuario
      setData("user", {
        userInfo: {
          providerId: "firebase",
          proactiveRefresh: {
            user: {
              uid: "kHXq79CbI7delhbqeFLdG3WJBqk2",
              email: "rodrigocremella@gmail.com",
              emailVerified: true,
              displayName: "Rodrigo Cremella",
              isAnonymous: false,
              photoURL:
                "https://lh3.googleusercontent.com/a-/AOh14GgZYieOLM4OfMsyQ1_-i1UimJySENWd0VmU6YUT8w=s96-c",
              providerData: [
                {
                  providerId: "google.com",
                  uid: "118132128347502231217",
                  displayName: "Rodrigo Cremella",
                  email: "rodrigocremella@gmail.com",
                  phoneNumber: null,
                  photoURL:
                    "https://lh3.googleusercontent.com/a-/AOh14GgZYieOLM4OfMsyQ1_-i1UimJySENWd0VmU6YUT8w=s96-c",
                },
              ],

              createdAt: "1654266981363",
              lastLoginAt: "1654891813848",
              apiKey: "AIzaSyCwQh5Cg2NQKzZHMIbcHR3eWCzlHHOrshY",
              appName: "[DEFAULT]",
            },
            isRunning: false,
            timerId: null,
            errorBackoff: 30000,
          },
          reloadUserInfo: {
            localId: "kHXq79CbI7delhbqeFLdG3WJBqk2",
            email: "rodrigocremella@gmail.com",
            displayName: "Rodrigo Cremella",
            photoUrl:
              "https://lh3.googleusercontent.com/a-/AOh14GgZYieOLM4OfMsyQ1_-i1UimJySENWd0VmU6YUT8w=s96-c",
            emailVerified: true,
            providerUserInfo: [
              {
                providerId: "google.com",
                displayName: "Rodrigo Cremella",
                photoUrl:
                  "https://lh3.googleusercontent.com/a-/AOh14GgZYieOLM4OfMsyQ1_-i1UimJySENWd0VmU6YUT8w=s96-c",
                federatedId: "118132128347502231217",
                email: "rodrigocremella@gmail.com",
                rawId: "118132128347502231217",
              },
            ],
            validSince: "1654266981",
            lastLoginAt: "1654891813848",
            createdAt: "1654266981363",
            lastRefreshAt: "2022-06-10T20:10:13.848Z",
          },
          reloadListener: null,
          uid: "kHXq79CbI7delhbqeFLdG3WJBqk2",
          auth: {
            apiKey: "AIzaSyCwQh5Cg2NQKzZHMIbcHR3eWCzlHHOrshY",
            authDomain: "pf-gp1.firebaseapp.com",
            appName: "[DEFAULT]",
            currentUser: {
              uid: "kHXq79CbI7delhbqeFLdG3WJBqk2",
              email: "rodrigocremella@gmail.com",
              emailVerified: true,
              displayName: "Rodrigo Cremella",
              isAnonymous: false,
              photoURL:
                "https://lh3.googleusercontent.com/a-/AOh14GgZYieOLM4OfMsyQ1_-i1UimJySENWd0VmU6YUT8w=s96-c",
              providerData: [
                {
                  providerId: "google.com",
                  uid: "118132128347502231217",
                  displayName: "Rodrigo Cremella",
                  email: "rodrigocremella@gmail.com",
                  phoneNumber: null,
                  photoURL:
                    "https://lh3.googleusercontent.com/a-/AOh14GgZYieOLM4OfMsyQ1_-i1UimJySENWd0VmU6YUT8w=s96-c",
                },
              ],
              stsTokenManager: {
                refreshToken:
                  "AIwUaOkUkmOLBojs4J7RkyjlrHc_ob2uZkF_CrSapfPiS5UTKfGTYIN2CrmgXgmfrSVNNBLmhrk8ebtkDsuCxIClT7eeMofC6__cUdXwUKGQxSqmqmaaBdklFl0LovVkq-Rhr_x5_SnNBpi2MTO1NwdsXrctEc2ABhIlGiPks1sVkQuLWXTdAJ8zdZ_MK09kaRGxfg7KtWflIWnxeH-bFIRoyUgnb51SuL_JWExKphAhHV5_uc27mPg8E0ejE3k0Ok0WLYukKBqVerjnz_CXF7Bwd8K3w41hxZjipWIXYN5XG5Kf66ly_wLo7XesmWZ7C4hLf8lvB9U61fq6rPp7ZWTSTIQx10o8ia7opqtj23h1YQaUzu18QxE-1Z9DNmTZv7u0U1Ne9oRgTYI7a06kWTXXpgLvp1Yaow",
                accessToken:
                  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFhZWY1NjlmNTI0MTRlOWY0YTcxMDRiNmQwNzFmMDY2ZGZlZWQ2NzciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUm9kcmlnbyBDcmVtZWxsYSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHZ1pZaWVPTE00T2ZNc3lRMV8taTFVaW1KeVNFTldkMFZtVTZZVVQ4dz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9wZi1ncDEiLCJhdWQiOiJwZi1ncDEiLCJhdXRoX3RpbWUiOjE2NTQ4OTE4MTMsInVzZXJfaWQiOiJrSFhxNzlDYkk3ZGVsaGJxZUZMZEczV0pCcWsyIiwic3ViIjoia0hYcTc5Q2JJN2RlbGhicWVGTGRHM1dKQnFrMiIsImlhdCI6MTY1NDg5MTgxMywiZXhwIjoxNjU0ODk1NDEzLCJlbWFpbCI6InJvZHJpZ29jcmVtZWxsYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExODEzMjEyODM0NzUwMjIzMTIxNyJdLCJlbWFpbCI6WyJyb2RyaWdvY3JlbWVsbGFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.gAsIsZLAEG_YNyjh202vc1XCeXZl6_yQczKnendkaWJi7MV0d1u2R01uPG0Aae4HFJQyONbTB27ucfErbQDfvKesqYQoIAx13_l990G_Nqlq3aI-ocTi91rzAXkR9J4yXt_p1ERty9_rQbc66tSSaoRNn8jZN3uhwbjWqq8-IUSjAjgn7LZkGC3V3KgzCNtYdg00nzNlf9hKOLEb8coxLuNBTvNxqteIaAxCVoEbnz5c53NISdDtSDhSOnVUtKKsMO9D_nWqpIh3h8smC2QIfhWQFm0v5M3lIEc7ybY9j7YTmz1BBzu89zWm9nHHJkh9m_e1D8DZg8K3HYfAc3W-cg",
                expirationTime: 1654895413405,
              },
              createdAt: "1654266981363",
              lastLoginAt: "1654891813848",
              apiKey: "AIzaSyCwQh5Cg2NQKzZHMIbcHR3eWCzlHHOrshY",
              appName: "[DEFAULT]",
            },
          },
          stsTokenManager: {
            refreshToken:
              "AIwUaOkUkmOLBojs4J7RkyjlrHc_ob2uZkF_CrSapfPiS5UTKfGTYIN2CrmgXgmfrSVNNBLmhrk8ebtkDsuCxIClT7eeMofC6__cUdXwUKGQxSqmqmaaBdklFl0LovVkq-Rhr_x5_SnNBpi2MTO1NwdsXrctEc2ABhIlGiPks1sVkQuLWXTdAJ8zdZ_MK09kaRGxfg7KtWflIWnxeH-bFIRoyUgnb51SuL_JWExKphAhHV5_uc27mPg8E0ejE3k0Ok0WLYukKBqVerjnz_CXF7Bwd8K3w41hxZjipWIXYN5XG5Kf66ly_wLo7XesmWZ7C4hLf8lvB9U61fq6rPp7ZWTSTIQx10o8ia7opqtj23h1YQaUzu18QxE-1Z9DNmTZv7u0U1Ne9oRgTYI7a06kWTXXpgLvp1Yaow",
            accessToken:
              "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFhZWY1NjlmNTI0MTRlOWY0YTcxMDRiNmQwNzFmMDY2ZGZlZWQ2NzciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUm9kcmlnbyBDcmVtZWxsYSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHZ1pZaWVPTE00T2ZNc3lRMV8taTFVaW1KeVNFTldkMFZtVTZZVVQ4dz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9wZi1ncDEiLCJhdWQiOiJwZi1ncDEiLCJhdXRoX3RpbWUiOjE2NTQ4OTE4MTMsInVzZXJfaWQiOiJrSFhxNzlDYkk3ZGVsaGJxZUZMZEczV0pCcWsyIiwic3ViIjoia0hYcTc5Q2JJN2RlbGhicWVGTGRHM1dKQnFrMiIsImlhdCI6MTY1NDg5MTgxMywiZXhwIjoxNjU0ODk1NDEzLCJlbWFpbCI6InJvZHJpZ29jcmVtZWxsYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExODEzMjEyODM0NzUwMjIzMTIxNyJdLCJlbWFpbCI6WyJyb2RyaWdvY3JlbWVsbGFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.gAsIsZLAEG_YNyjh202vc1XCeXZl6_yQczKnendkaWJi7MV0d1u2R01uPG0Aae4HFJQyONbTB27ucfErbQDfvKesqYQoIAx13_l990G_Nqlq3aI-ocTi91rzAXkR9J4yXt_p1ERty9_rQbc66tSSaoRNn8jZN3uhwbjWqq8-IUSjAjgn7LZkGC3V3KgzCNtYdg00nzNlf9hKOLEb8coxLuNBTvNxqteIaAxCVoEbnz5c53NISdDtSDhSOnVUtKKsMO9D_nWqpIh3h8smC2QIfhWQFm0v5M3lIEc7ybY9j7YTmz1BBzu89zWm9nHHJkh9m_e1D8DZg8K3HYfAc3W-cg",
            expirationTime: 1654895413405,
          },
          accessToken:
            "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFhZWY1NjlmNTI0MTRlOWY0YTcxMDRiNmQwNzFmMDY2ZGZlZWQ2NzciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUm9kcmlnbyBDcmVtZWxsYSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHZ1pZaWVPTE00T2ZNc3lRMV8taTFVaW1KeVNFTldkMFZtVTZZVVQ4dz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9wZi1ncDEiLCJhdWQiOiJwZi1ncDEiLCJhdXRoX3RpbWUiOjE2NTQ4OTE4MTMsInVzZXJfaWQiOiJrSFhxNzlDYkk3ZGVsaGJxZUZMZEczV0pCcWsyIiwic3ViIjoia0hYcTc5Q2JJN2RlbGhicWVGTGRHM1dKQnFrMiIsImlhdCI6MTY1NDg5MTgxMywiZXhwIjoxNjU0ODk1NDEzLCJlbWFpbCI6InJvZHJpZ29jcmVtZWxsYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExODEzMjEyODM0NzUwMjIzMTIxNyJdLCJlbWFpbCI6WyJyb2RyaWdvY3JlbWVsbGFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.gAsIsZLAEG_YNyjh202vc1XCeXZl6_yQczKnendkaWJi7MV0d1u2R01uPG0Aae4HFJQyONbTB27ucfErbQDfvKesqYQoIAx13_l990G_Nqlq3aI-ocTi91rzAXkR9J4yXt_p1ERty9_rQbc66tSSaoRNn8jZN3uhwbjWqq8-IUSjAjgn7LZkGC3V3KgzCNtYdg00nzNlf9hKOLEb8coxLuNBTvNxqteIaAxCVoEbnz5c53NISdDtSDhSOnVUtKKsMO9D_nWqpIh3h8smC2QIfhWQFm0v5M3lIEc7ybY9j7YTmz1BBzu89zWm9nHHJkh9m_e1D8DZg8K3HYfAc3W-cg",
          displayName: "Rodrigo Cremella",
          email: "rodrigocremella@gmail.com",
          emailVerified: true,
          phoneNumber: null,
          photoURL:
            "https://lh3.googleusercontent.com/a-/AOh14GgZYieOLM4OfMsyQ1_-i1UimJySENWd0VmU6YUT8w=s96-c",
          isAnonymous: false,
          tenantId: null,
          providerData: [
            {
              providerId: "google.com",
              uid: "118132128347502231217",
              displayName: "Rodrigo Cremella",
              email: "rodrigocremella@gmail.com",
              phoneNumber: null,
              photoURL:
                "https://lh3.googleusercontent.com/a-/AOh14GgZYieOLM4OfMsyQ1_-i1UimJySENWd0VmU6YUT8w=s96-c",
            },
          ],
          metadata: {
            createdAt: "1654266981363",
            lastLoginAt: "1654891813848",
          },
          rol: "admin",
          visualizacion: "admin",
        },
      });

      // Para recuperar el usuario
      const user = await getData("user");
      console.log(user);

      // Usuario que inició sesión
      console.log(isAuthenticated, "xd");
    })();
  }, []);

  const onAuth = () => {
    if (isBiometricAvailable) {
      LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with Touch ID",
        fallbackLabel: "Enter Password",
      }).then((result) => {
        setIsAuthenticated(result.success);
      });
    } else {
      //google Sign in
    }
  };

  const HomeTabs = () => {
    return (
      <Tab.Navigator
        initialRouteName="Store"
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="Inicio"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={21} />
            ),
          }}
        />

        <Tab.Screen
          name="Tienda"
          component={Tienda}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="store" size={19} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Favoritos"
          component={Favoritos}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart-sharp" size={24} color="grey" />
            ),
          }}
        />

        <Tab.Screen
          name="Cuenta"
          children={() => <Cuenta setIsAuthenticated={setIsAuthenticated} />}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
  return (
    <>
      {isAuthenticated ? (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Screen name="DetalleProducto" component={DetalleProducto} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <Login onAuth={onAuth} setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
}
