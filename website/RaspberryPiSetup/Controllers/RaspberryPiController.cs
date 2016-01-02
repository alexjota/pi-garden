namespace RaspberryPiSetup.Controllers
{
    using Microsoft.Azure.Devices;
    using System.Configuration;
    using System.Text;
    using System.Threading.Tasks;
    using System.Web.Mvc;

    public class RaspberryPiController : Controller
    {
        static ServiceClient serviceClient;

        public RaspberryPiController()
        {
            var connectionString = ConfigurationManager.ConnectionStrings["iothubConnectionString"].ConnectionString;
            serviceClient = ServiceClient.CreateFromConnectionString(connectionString);
        }

        [HttpGet]
        public ActionResult Index()
        {
            ViewBag.Ip = HttpContext.Application["ip"];
            ViewBag.Code = HttpContext.Application["code"];

            return View("Index");
        }

        [HttpPost]
        public async Task<ActionResult> Connect()
        {
            var commandMessage = new Message(Encoding.ASCII.GetBytes("connect-fb"));
            await serviceClient.SendAsync("garden-1", commandMessage);
            return this.RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<ActionResult> PostText()
        {
            var commandMessage = new Message(Encoding.ASCII.GetBytes("post-fb"));
            await serviceClient.SendAsync("garden-1", commandMessage);
            return this.RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<ActionResult> PostPhoto()
        {
            var commandMessage = new Message(Encoding.ASCII.GetBytes("post-photo-fb"));
            await serviceClient.SendAsync("garden-1", commandMessage);
            return this.RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<ActionResult> LightOn()
        {
            var commandMessage = new Message(Encoding.ASCII.GetBytes("light-on"));
            await serviceClient.SendAsync("garden-1", commandMessage);

            return this.RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<ActionResult> LightOff()
        {
            var commandMessage = new Message(Encoding.ASCII.GetBytes("light-off"));
            await serviceClient.SendAsync("garden-1", commandMessage);

            return this.RedirectToAction("Index");
        }
    }
}