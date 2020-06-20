// Contains consumer key and access token information from Twitter API
// Set up access to Twitter via Twit library
const T = new Twit({
	consumer_key: "GGYozqZxAX7pgoFfOjunWA7XJ",
	consumer_secret: "BQ57Zt3jdN8yVXbhfPwua8J65rypZG84LKZpnkWzd0uLcWY9jG",
	access_token: "1001060235681857536-Inm3ZLLoktAfghEuBErIfVqZluT9x0",
	access_token_secret: "eX5SHrzqmuQiJzixBcsKtFLPTkXtPtklO9pbEhkd8zxYA",
	timeout_ms: 600000,
});

export default T;
