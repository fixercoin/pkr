BOT_TOKEN = '8129019055:AAE07J1I6Q3G-EDf_jizVO9EEkjvA_HFWTw'
DEPOSIT_ADDRESS = 'UQDgTAJi4Mw_8TpjrVmU-g1z7J9CuWKpwcwiqEmPeIzC494c'
API_KEY = '2864627aef25ebaa0d03138fdf5da4425e1e3919a29e10397d3b42b1127588ab'
RUN_IN_MAINNET = True  # Switch True/False to change mainnet to testnet

if RUN_IN_MAINNET:
    API_BASE_URL = 'https://toncenter.com'
else:
    API_BASE_URL = 'https://testnet.toncenter.com'
