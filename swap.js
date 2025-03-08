 window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
        } catch (error) {
            console.log('User denied account access');
        }
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

async function swapTokens() {
    const fromToken = document.getElementById('fromToken').value;
    const toToken = document.getElementById('toToken').value;
    const amount = document.getElementById('amount').value;

    const accounts = await web3.eth.getAccounts();
    if (!fromToken || !toToken || !amount) {
        document.getElementById('result').innerText = 'Please fill in all fields.';
        return;
    }

    try {
        document.getElementById('loader').classList.remove('hidden');
        const fromTokenContract = new web3.eth.Contract(fromTokenABI, fromToken);
        const toTokenContract = new web3.eth.Contract(toTokenABI, toToken);

        await fromTokenContract.methods.approve(routerAddress, amount).send({ from: accounts:inlineRefs{references="&#91;&#123;&quot;type&quot;&#58;&quot;inline_reference&quot;,&quot;start_index&quot;&#58;3587,&quot;end_index&quot;&#58;3590,&quot;number&quot;&#58;0,&quot;url&quot;&#58;&quot;https&#58;//www.quicknode.com/guides/defi/dexs/how-to-swap-tokens-on-uniswap-with-ethersjs&quot;,&quot;favicon&quot;&#58;&quot;https&#58;//imgs.search.brave.com/GClZVyIdgtA6VIlPEZVIIx7H5LLKgmXrjy8cimGL6_g/rs&#58;fit&#58;32&#58;32&#58;1&#58;0/g&#58;ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvOTM3Nzc2MWE5/MGFhMmIwYTcyNDcz/MzE1YzU0NzgyZDFi/ZjcyMTU5YzNjNzUw/NzljMjE5N2UwMzlj/ZWE1NmM1OC93d3cu/cXVpY2tub2RlLmNv/bS8&quot;,&quot;snippet&quot;&#58;&quot;Uniswap&#32;has&#32;its&#32;V2&#32;contracts&#32;categorized&#32;into&#32;two&#32;repositories,&#32;Core&#32;&amp;amp;&#32;Periphery.&#32;Uniswap&#32;also&#32;offers&#32;a&#32;helpful&#32;SDK&#32;for&#32;developing&#32;on&#32;and&#32;interacting&#32;with&#32;its&#32;protocol.&#32;The&#32;core&#32;contracts&#32;cover&#32;creating&#32;pairs&#32;(pools)&#32;and&#32;maintaining&#32;track&#32;of&#32;balances,&#32;while&#32;the&#32;periphery&#32;helps&#32;us&#32;interact&#32;with&#32;these&#32;core&#32;contracts.&#32;If&#32;you&#32;want&#32;an&#32;overview&#32;or&#32;want&#32;to&#32;learn&#32;how&#32;to&#32;fetch&#32;the&#32;market&#32;price&#32;of&#32;a&#32;tok…&quot;&#125;&#93;"} });
        await toTokenContract.methods.swapExactTokensForTokens(amount, 0, [fromToken, toToken], accounts:inlineRefs{references="&#91;&#123;&quot;type&quot;&#58;&quot;inline_reference&quot;,&quot;start_index&quot;&#58;3699,&quot;end_index&quot;&#58;3702,&quot;number&quot;&#58;0,&quot;url&quot;&#58;&quot;https&#58;//www.quicknode.com/guides/defi/dexs/how-to-swap-tokens-on-uniswap-with-ethersjs&quot;,&quot;favicon&quot;&#58;&quot;https&#58;//imgs.search.brave.com/GClZVyIdgtA6VIlPEZVIIx7H5LLKgmXrjy8cimGL6_g/rs&#58;fit&#58;32&#58;32&#58;1&#58;0/g&#58;ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvOTM3Nzc2MWE5/MGFhMmIwYTcyNDcz/MzE1YzU0NzgyZDFi/ZjcyMTU5YzNjNzUw/NzljMjE5N2UwMzlj/ZWE1NmM1OC93d3cu/cXVpY2tub2RlLmNv/bS8&quot;,&quot;snippet&quot;&#58;&quot;Dependency&#58;&#32;node&#32;•&#32;Version&#58;&#32;18.13.0…&quot;&#125;&#93;"}, Date.now() + 1000 * 60 * 10).send({ from: accounts:inlineRefs{references="&#91;&#123;&quot;type&quot;&#58;&quot;inline_reference&quot;,&quot;start_index&quot;&#58;3754,&quot;end_index&quot;&#58;3757,&quot;number&quot;&#58;0,&quot;url&quot;&#58;&quot;https&#58;//www.quicknode.com/guides/defi/dexs/how-to-swap-tokens-on-uniswap-with-ethersjs&quot;,&quot;favicon&quot;&#58;&quot;https&#58;//imgs.search.brave.com/GClZVyIdgtA6VIlPEZVIIx7H5LLKgmXrjy8cimGL6_g/rs&#58;fit&#58;32&#58;32&#58;1&#58;0/g&#58;ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvOTM3Nzc2MWE5/MGFhMmIwYTcyNDcz/MzE1YzU0NzgyZDFi/ZjcyMTU5YzNjNzUw/NzljMjE5N2UwMzlj/ZWE1NmM1OC93d3cu/cXVpY2tub2RlLmNv/bS8&quot;,&quot;snippet&quot;&#58;&quot;Navigate&#32;to&#32;the&#32;source&#32;code&#32;for&#32;the&#32;Router&#32;address&#32;on&#32;Etherscan&#32;and&#32;copy&#32;the&#32;ABI&#32;into&#32;your&#32;./abis/router.json&#32;file&#32;(the&#32;ABI&#32;can&#32;be&#32;found&#32;on&#32;the&#32;Contract&#32;tab)&#32;Ensure&#32;your&#32;wallet&#32;has&#32;enough&#32;ETH&#32;on&#32;mainnet&#32;to&#32;pay&#32;for&#32;gas&#32;fees&#32;·&#32;Now&#32;we'll&#32;cover&#32;the&#32;code&#32;needed&#32;to&#32;swap&#32;tokens&#32;programmatically…&quot;&#125;&#93;"} });

        document.getElementById('result').innerText = 'Swap successful!';
    } catch (error) {
        document.getElementById('result').innerText = 'Swap failed';
    }
}
