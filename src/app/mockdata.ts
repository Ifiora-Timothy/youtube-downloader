import { format } from "./UI/HorizontalListCard";
type vid = {
    author: string;
    title: string;
    video_url: NodeRequire;
    lengthInSecs: number;
    uploadDate: number;
    thumbnails: {
      url: string;
      width: number;
      height: number;
    }[];
  };
type dataFormat = {
  videoDetails: vid;
  formats: format[];
};

const formats: format[] = [
  {
    approxDurationMs: "26000",
    averageBitrate: 3197493,
    bitrate: 3678097,
    contentLength: "10391855",
    qualityLabel: "1080p",
    url: "https://rr2---sn-huoob-avnz.googlevideo.com/videoplayback?expire=1709059592&ei=qNndZbGzFKfNp-oPiPmqyA8&ip=102.91.69.97&id=o-AMDiDmsXohazdDjHvCxcXGHZDvfQRavrgFNLeqQhYVB5&itag=137&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=59&mm=31%2C29&mn=sn-huoob-avnz%2Csn-avn7ln7l&ms=au%2Crdu&mv=m&mvi=2&pl=24&initcwndbps=328750&spc=UWF9f7Abh7dfr1GGod6wVOtH0UNazsIhWAIZ4PE6Dq0UbYI&vprv=1&svpuc=1&mime=video%2Fmp4&ns=SRpeE9HAvsBdZoxvdVuXEL4Q&gir=yes&clen=10391855&dur=26.000&lmt=1654802792003385&mt=1709037662&fvip=3&keepalive=yes&fexp=24007246&c=WEB&sefc=1&txp=6319224&n=Mk8KlslVTepY8HwgR&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAJVI4uU5UycQKwflzDZg0Nyq_SdJu6mJZxjsZQLo6AS9AiEAkvfbPOJgZTj1avPt3Lw0T_DdYymIqPFky32lriIy0HI%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=APTiJQcwRQIgHqaPhisfxxJXVidVLi3uGgnleyWUmGaK2ANQFz9ISI8CIQDlpJUOKNYLshvhP-hnR-11oBOC0vf__97ZtqvngBI-bg%3D%3D",
    itag: 137,
  },
  {
    approxDurationMs: "25999",
    averageBitrate: 1786176,
    bitrate: 2089326,
    contentLength: "5804851",
    qualityLabel: "1080p",
    url: "https://rr2---sn-huoob-avnz.googlevideo.com/videoplayback?expire=1709059592&ei=qNndZbGzFKfNp-oPiPmqyA8&ip=102.91.69.97&id=o-AMDiDmsXohazdDjHvCxcXGHZDvfQRavrgFNLeqQhYVB5&itag=248&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=59&mm=31%2C29&mn=sn-huoob-avnz%2Csn-avn7ln7l&ms=au%2Crdu&mv=m&mvi=2&pl=24&initcwndbps=328750&spc=UWF9f7Abh7dfr1GGod6wVOtH0UNazsIhWAIZ4PE6Dq0UbYI&vprv=1&svpuc=1&mime=video%2Fwebm&ns=SRpeE9HAvsBdZoxvdVuXEL4Q&gir=yes&clen=5804851&dur=25.999&lmt=1654802788686895&mt=1709037662&fvip=3&keepalive=yes&fexp=24007246&c=WEB&sefc=1&txp=6319224&n=Mk8KlslVTepY8HwgR&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAIHGVQUs2Q4vBZ20o0oHRd2gMt3e8XB36DGxol3ADrnjAiEA3xng7yrHdgZKMJ5daLef4twLKkUOP_TUjPVj4P0yYa0%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=APTiJQcwRQIgHqaPhisfxxJXVidVLi3uGgnleyWUmGaK2ANQFz9ISI8CIQDlpJUOKNYLshvhP-hnR-11oBOC0vf__97ZtqvngBI-bg%3D%3D",
    itag: 248,
  },
  {
    approxDurationMs: "26000",
    averageBitrate: 1707322,
    bitrate: 1894268,
    contentLength: "5548798",
    qualityLabel: "720p",
    url: "https://rr2---sn-huoob-avnz.googlevideo.com/videoplayback?expire=1709059592&ei=qNndZbGzFKfNp-oPiPmqyA8&ip=102.91.69.97&id=o-AMDiDmsXohazdDjHvCxcXGHZDvfQRavrgFNLeqQhYVB5&itag=136&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=59&mm=31%2C29&mn=sn-huoob-avnz%2Csn-avn7ln7l&ms=au%2Crdu&mv=m&mvi=2&pl=24&initcwndbps=328750&spc=UWF9f7Abh7dfr1GGod6wVOtH0UNazsIhWAIZ4PE6Dq0UbYI&vprv=1&svpuc=1&mime=video%2Fmp4&ns=SRpeE9HAvsBdZoxvdVuXEL4Q&gir=yes&clen=5548798&dur=26.000&lmt=1654802789293860&mt=1709037662&fvip=3&keepalive=yes&fexp=24007246&c=WEB&sefc=1&txp=6319224&n=Mk8KlslVTepY8HwgR&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgP8u1zRbqe1-dM6KrXhhMssDAI3TkRGGlhjLuxuJKzo4CIHK4Ph_KflGBL86GFydehKbBs91QD7SkdpNxHdbZQmqy&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=APTiJQcwRQIgHqaPhisfxxJXVidVLi3uGgnleyWUmGaK2ANQFz9ISI8CIQDlpJUOKNYLshvhP-hnR-11oBOC0vf__97ZtqvngBI-bg%3D%3D",
    itag: 136,
  },
  {
    approxDurationMs: "25999",
    averageBitrate: 1070826,
    bitrate: 1244219,
    contentLength: "3480053",
    qualityLabel: "720p",
    url: "https://rr2---sn-huoob-avnz.googlevideo.com/videoplayback?expire=1709059592&ei=qNndZbGzFKfNp-oPiPmqyA8&ip=102.91.69.97&id=o-AMDiDmsXohazdDjHvCxcXGHZDvfQRavrgFNLeqQhYVB5&itag=247&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=59&mm=31%2C29&mn=sn-huoob-avnz%2Csn-avn7ln7l&ms=au%2Crdu&mv=m&mvi=2&pl=24&initcwndbps=328750&spc=UWF9f7Abh7dfr1GGod6wVOtH0UNazsIhWAIZ4PE6Dq0UbYI&vprv=1&svpuc=1&mime=video%2Fwebm&ns=SRpeE9HAvsBdZoxvdVuXEL4Q&gir=yes&clen=3480053&dur=25.999&lmt=1654802789819773&mt=1709037662&fvip=3&keepalive=yes&fexp=24007246&c=WEB&sefc=1&txp=6319224&n=Mk8KlslVTepY8HwgR&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhANXQ4p0DnmY0GNXicBi9YRmDooaApvGWXFDZujG4XEV6AiAcmZ9L6j53knxbAR17DcNLAMZEuSODidrabNtFdYGzwQ%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=APTiJQcwRQIgHqaPhisfxxJXVidVLi3uGgnleyWUmGaK2ANQFz9ISI8CIQDlpJUOKNYLshvhP-hnR-11oBOC0vf__97ZtqvngBI-bg%3D%3D",
    itag: 247,
  },
  {
    approxDurationMs: "26000",
    averageBitrate: 861427,
    bitrate: 958489,
    contentLength: "2799640",
    qualityLabel: "480p",
    url: "https://rr2---sn-huoob-avnz.googlevideo.com/videoplayback?expire=1709059592&ei=qNndZbGzFKfNp-oPiPmqyA8&ip=102.91.69.97&id=o-AMDiDmsXohazdDjHvCxcXGHZDvfQRavrgFNLeqQhYVB5&itag=135&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=59&mm=31%2C29&mn=sn-huoob-avnz%2Csn-avn7ln7l&ms=au%2Crdu&mv=m&mvi=2&pl=24&initcwndbps=328750&spc=UWF9f7Abh7dfr1GGod6wVOtH0UNazsIhWAIZ4PE6Dq0UbYI&vprv=1&svpuc=1&mime=video%2Fmp4&ns=SRpeE9HAvsBdZoxvdVuXEL4Q&gir=yes&clen=2799640&dur=26.000&lmt=1654802790853079&mt=1709037662&fvip=3&keepalive=yes&fexp=24007246&c=WEB&sefc=1&txp=6319224&n=Mk8KlslVTepY8HwgR&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAJAcISwP7WUeJBKdcvWKNq9gWKJ1BqCatklaI94FskRaAiEAnNQ4_pyqHSwF1OqLNg4MrNQVfFV-0GAzZK0qR4xeWOs%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=APTiJQcwRQIgHqaPhisfxxJXVidVLi3uGgnleyWUmGaK2ANQFz9ISI8CIQDlpJUOKNYLshvhP-hnR-11oBOC0vf__97ZtqvngBI-bg%3D%3D",
    itag: 135,
  },
  {
    approxDurationMs: "25999",
    averageBitrate: 542944,
    bitrate: 616761,
    contentLength: "1764501",
    qualityLabel: "480p",
    url: "https://rr2---sn-huoob-avnz.googlevideo.com/videoplayback?expire=1709059592&ei=qNndZbGzFKfNp-oPiPmqyA8&ip=102.91.69.97&id=o-AMDiDmsXohazdDjHvCxcXGHZDvfQRavrgFNLeqQhYVB5&itag=244&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=59&mm=31%2C29&mn=sn-huoob-avnz%2Csn-avn7ln7l&ms=au%2Crdu&mv=m&mvi=2&pl=24&initcwndbps=328750&spc=UWF9f7Abh7dfr1GGod6wVOtH0UNazsIhWAIZ4PE6Dq0UbYI&vprv=1&svpuc=1&mime=video%2Fwebm&ns=SRpeE9HAvsBdZoxvdVuXEL4Q&gir=yes&clen=1764501&dur=25.999&lmt=1654802788529427&mt=1709037662&fvip=3&keepalive=yes&fexp=24007246&c=WEB&sefc=1&txp=6319224&n=Mk8KlslVTepY8HwgR&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAL-ZaO6bVLVQ5z-oTx2fD8I9yudL9gnWsNE0ePc-0ILqAiEAso7HYXNoMShYsLUsHQD6MusJ6AKKBbg10gXKO-O2SfE%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=APTiJQcwRQIgHqaPhisfxxJXVidVLi3uGgnleyWUmGaK2ANQFz9ISI8CIQDlpJUOKNYLshvhP-hnR-11oBOC0vf__97ZtqvngBI-bg%3D%3D",
    itag: 244,
  },
  {
    approxDurationMs: "26000",
    averageBitrate: 386512,
    bitrate: 559792,
    contentLength: "1256165",
    qualityLabel: "360p",
    url: "https://rr2---sn-huoob-avnz.googlevideo.com/videoplayback?expire=1709059592&ei=qNndZbGzFKfNp-oPiPmqyA8&ip=102.91.69.97&id=o-AMDiDmsXohazdDjHvCxcXGHZDvfQRavrgFNLeqQhYVB5&itag=134&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=59&mm=31%2C29&mn=sn-huoob-avnz%2Csn-avn7ln7l&ms=au%2Crdu&mv=m&mvi=2&pl=24&initcwndbps=328750&spc=UWF9f7Abh7dfr1GGod6wVOtH0UNazsIhWAIZ4PE6Dq0UbYI&vprv=1&svpuc=1&mime=video%2Fmp4&ns=SRpeE9HAvsBdZoxvdVuXEL4Q&gir=yes&clen=1256165&dur=26.000&lmt=1654802790195513&mt=1709037662&fvip=3&keepalive=yes&fexp=24007246&c=WEB&sefc=1&txp=6319224&n=Mk8KlslVTepY8HwgR&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAO-FEZj1IDQg7U3xJ4j57we_YaOH-G70Ev6zXVHED4KLAiEA8fOknU25SkNsW4LMOrKRb8pPVpXE8Hh19Ada0CIUGKE%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=APTiJQcwRQIgHqaPhisfxxJXVidVLi3uGgnleyWUmGaK2ANQFz9ISI8CIQDlpJUOKNYLshvhP-hnR-11oBOC0vf__97ZtqvngBI-bg%3D%3D",
    itag: 134,
  },
  {
    approxDurationMs: "25999",
    averageBitrate: 300598,
    bitrate: 332364,
    contentLength: "976907",
    qualityLabel: "360p",
    url: "https://rr2---sn-huoob-avnz.googlevideo.com/videoplayback?expire=1709059592&ei=qNndZbGzFKfNp-oPiPmqyA8&ip=102.91.69.97&id=o-AMDiDmsXohazdDjHvCxcXGHZDvfQRavrgFNLeqQhYVB5&itag=243&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=59&mm=31%2C29&mn=sn-huoob-avnz%2Csn-avn7ln7l&ms=au%2Crdu&mv=m&mvi=2&pl=24&initcwndbps=328750&spc=UWF9f7Abh7dfr1GGod6wVOtH0UNazsIhWAIZ4PE6Dq0UbYI&vprv=1&svpuc=1&mime=video%2Fwebm&ns=SRpeE9HAvsBdZoxvdVuXEL4Q&gir=yes&clen=976907&dur=25.999&lmt=1654802790393507&mt=1709037662&fvip=3&keepalive=yes&fexp=24007246&c=WEB&sefc=1&txp=6319224&n=Mk8KlslVTepY8HwgR&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgQdxlEmkJkEslBoWyOHHbHWPgpZZ8RLfp8AIEyEk3u9YCIQClQNbAxxBPdqz74QPPkpa3zYngbZbTXGM0spUE96r_UA%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=APTiJQcwRQIgHqaPhisfxxJXVidVLi3uGgnleyWUmGaK2ANQFz9ISI8CIQDlpJUOKNYLshvhP-hnR-11oBOC0vf__97ZtqvngBI-bg%3D%3D",
    itag: 243,
  },
  {
    approxDurationMs: "26000",
    averageBitrate: 189616,
    bitrate: 256704,
    contentLength: "616252",
    qualityLabel: "240p",
    url: "https://rr2---sn-huoob-avnz.googlevideo.com/videoplayback?expire=1709059592&ei=qNndZbGzFKfNp-oPiPmqyA8&ip=102.91.69.97&id=o-AMDiDmsXohazdDjHvCxcXGHZDvfQRavrgFNLeqQhYVB5&itag=133&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=59&mm=31%2C29&mn=sn-huoob-avnz%2Csn-avn7ln7l&ms=au%2Crdu&mv=m&mvi=2&pl=24&initcwndbps=328750&spc=UWF9f7Abh7dfr1GGod6wVOtH0UNazsIhWAIZ4PE6Dq0UbYI&vprv=1&svpuc=1&mime=video%2Fmp4&ns=SRpeE9HAvsBdZoxvdVuXEL4Q&gir=yes&clen=616252&dur=26.000&lmt=1654802790265648&mt=1709037662&fvip=3&keepalive=yes&fexp=24007246&c=WEB&sefc=1&txp=6319224&n=Mk8KlslVTepY8HwgR&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIhAMUFqA8Dr0aYBAZfPQ3dUeYFR7ebBKkLWDEmiTxY5F4-AiA3SMWDLaOGfIR4LVtcFLqyDkDuYZgOnOHiSXqYGrAwWw%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=APTiJQcwRQIgHqaPhisfxxJXVidVLi3uGgnleyWUmGaK2ANQFz9ISI8CIQDlpJUOKNYLshvhP-hnR-11oBOC0vf__97ZtqvngBI-bg%3D%3D",
    itag: 133,
  },
  {
    approxDurationMs: "25999",
    averageBitrate: 172769,
    bitrate: 184035,
    contentLength: "561479",
    qualityLabel: "240p",
    url: "https://rr2---sn-huoob-avnz.googlevideo.com/videoplayback?expire=1709059592&ei=qNndZbGzFKfNp-oPiPmqyA8&ip=102.91.69.97&id=o-AMDiDmsXohazdDjHvCxcXGHZDvfQRavrgFNLeqQhYVB5&itag=242&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=59&mm=31%2C29&mn=sn-huoob-avnz%2Csn-avn7ln7l&ms=au%2Crdu&mv=m&mvi=2&pl=24&initcwndbps=328750&spc=UWF9f7Abh7dfr1GGod6wVOtH0UNazsIhWAIZ4PE6Dq0UbYI&vprv=1&svpuc=1&mime=video%2Fwebm&ns=SRpeE9HAvsBdZoxvdVuXEL4Q&gir=yes&clen=561479&dur=25.999&lmt=1654802788526924&mt=1709037662&fvip=3&keepalive=yes&fexp=24007246&c=WEB&sefc=1&txp=6319224&n=Mk8KlslVTepY8HwgR&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgMaDeUvHNdoVZBdSg-7FXKbZd1sIQOGZiCtl2sKMQY_cCIB2VYCJRYWvaKOLjJpVgpkuX4f_UuK5DOFmDr4IP-iRk&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=APTiJQcwRQIgHqaPhisfxxJXVidVLi3uGgnleyWUmGaK2ANQFz9ISI8CIQDlpJUOKNYLshvhP-hnR-11oBOC0vf__97ZtqvngBI-bg%3D%3D",
    itag: 242,
  },
  {
    approxDurationMs: "26000",
    averageBitrate: 85454,
    bitrate: 141315,
    contentLength: "277727",
    qualityLabel: "144p",
    url: "https://rr2---sn-huoob-avnz.googlevideo.com/videoplayback?expire=1709059592&ei=qNndZbGzFKfNp-oPiPmqyA8&ip=102.91.69.97&id=o-AMDiDmsXohazdDjHvCxcXGHZDvfQRavrgFNLeqQhYVB5&itag=160&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=59&mm=31%2C29&mn=sn-huoob-avnz%2Csn-avn7ln7l&ms=au%2Crdu&mv=m&mvi=2&pl=24&initcwndbps=328750&spc=UWF9f7Abh7dfr1GGod6wVOtH0UNazsIhWAIZ4PE6Dq0UbYI&vprv=1&svpuc=1&mime=video%2Fmp4&ns=SRpeE9HAvsBdZoxvdVuXEL4Q&gir=yes&clen=277727&dur=26.000&lmt=1654802791479357&mt=1709037662&fvip=3&keepalive=yes&fexp=24007246&c=WEB&sefc=1&txp=6319224&n=Mk8KlslVTepY8HwgR&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhAM7W4pDPAq35_lmOCnuInm9fK_lCdeM1uShtK5teFn0TAiEAhLwnXpmnMntaZxaPpDEC47Mo86OWhRoi8727_nY2Fek%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=APTiJQcwRQIgHqaPhisfxxJXVidVLi3uGgnleyWUmGaK2ANQFz9ISI8CIQDlpJUOKNYLshvhP-hnR-11oBOC0vf__97ZtqvngBI-bg%3D%3D",
    itag: 160,
  },
  {
    approxDurationMs: "25999",
    averageBitrate: 82869,
    bitrate: 96198,
    contentLength: "269316",
    qualityLabel: "144p",
    url: "https://rr2---sn-huoob-avnz.googlevideo.com/videoplayback?expire=1709059592&ei=qNndZbGzFKfNp-oPiPmqyA8&ip=102.91.69.97&id=o-AMDiDmsXohazdDjHvCxcXGHZDvfQRavrgFNLeqQhYVB5&itag=278&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=59&mm=31%2C29&mn=sn-huoob-avnz%2Csn-avn7ln7l&ms=au%2Crdu&mv=m&mvi=2&pl=24&initcwndbps=328750&spc=UWF9f7Abh7dfr1GGod6wVOtH0UNazsIhWAIZ4PE6Dq0UbYI&vprv=1&svpuc=1&mime=video%2Fwebm&ns=SRpeE9HAvsBdZoxvdVuXEL4Q&gir=yes&clen=269316&dur=25.999&lmt=1654802790052013&mt=1709037662&fvip=3&keepalive=yes&fexp=24007246&c=WEB&sefc=1&txp=6319224&n=Mk8KlslVTepY8HwgR&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgUWJyZzLfDslG4TwH2KJD5HM6oLfPd7kouTvISKCmXDgCIQD-N5MT5ntWU-F0QypLGYkH_f48ohNLQ0bPUvl0uYSHyw%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=APTiJQcwRQIgHqaPhisfxxJXVidVLi3uGgnleyWUmGaK2ANQFz9ISI8CIQDlpJUOKNYLshvhP-hnR-11oBOC0vf__97ZtqvngBI-bg%3D%3D",
    itag: 278,
  },
];
const videoDetails: vid = {
  author: "johndoe",
  lengthInSecs: 20000,
  uploadDate: Date.now(),
  title: "sample vid title",
  video_url: require("@/app/assets/images/smallImage.png"),
  thumbnails: [
    {
      url: require('@/app/assets/images/smallImage.png'),
      width: 200,
      height: 300,
    },
    {
      url: require('@/app/assets/images/smallImage.png'),
      width: 200,
      height: 300,
    },
    {
      url: require('@/app/assets/images/smallImage.png'),
      width: 200,
      height: 300,
    },
  ],
};

export const getSampleData = (type: "single" | "playlist" | "list") => {
  if (type === "single") {
    const data: dataFormat = {
      videoDetails: videoDetails,
      formats: formats,
    };
    return data;
  }
  if (type === "list") {
    const data: dataFormat[] = [
      {
        videoDetails: videoDetails,
        formats: formats,
      },
      {
        videoDetails: videoDetails,
        formats: formats,
      },
      {
        videoDetails: videoDetails,
        formats: formats,
      },
      {
        videoDetails: videoDetails,
        formats: formats,
      },
    ];
    return data;
  }
  const data: dataFormat[] = [
    {
      videoDetails: videoDetails,
      formats: formats,
    },
    {
      videoDetails: videoDetails,
      formats: formats,
    },
    {
      videoDetails: videoDetails,
      formats: formats,
    },
    {
      videoDetails: videoDetails,
      formats: formats,
    },
  ];

  return {
    playlistDetails: {
      author: "john doe",
      listTitle: "this is a plaliist title",
      totalLengthInSecs: 30,
      uploadDate: Date.now(),
    },
    videos: data,
  };
};
